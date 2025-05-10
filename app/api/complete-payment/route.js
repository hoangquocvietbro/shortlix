import { NextResponse } from 'next/server';
import axios from 'axios';
import { db } from "configs/db";
import { Users } from "configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    const PI_SERVER_API_KEY = process.env.PI_SERVER_API_KEY;
    try {
        const { paymentId, txid, credits, pi_username } = await req.json();

        if (!PI_SERVER_API_KEY) {
            console.error('PI_SERVER_API_KEY is not set');
            return NextResponse.json({ 
                success: false, 
                error: 'Server configuration error' 
            });
        }

        // 1. First verify the payment with Pi Network API
        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/complete`,
            { txid },
            {
                headers: {
                    Authorization: `Key ${PI_SERVER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // 2. If payment is verified, update the user's credits
        if (response.data && response.status === 200) {
            try {
                // Get current user data first
                const currentUser = await db
                    .select()
                    .from(Users)
                    .where(eq(Users.pi_username, pi_username));

                if (!currentUser || !currentUser.length) {
                    throw new Error("User not found");
                }

                // Calculate new credits
                const newCredits = (currentUser[0].credits || 0) + credits;

                // Update user credits and subscription
                const updatedUser = await db
                    .update(Users)
                    .set({ 
                        credits: newCredits,
                        subscription: true 
                    })
                    .where(eq(Users.pi_username, pi_username))
                    .returning();

                return NextResponse.json({ 
                    success: true, 
                    data: updatedUser[0]
                });
            } catch (dbError) {
                console.error('Database error:', dbError);
                return NextResponse.json({ 
                    success: false, 
                    error: 'Failed to update credits'
                });
            }
        } else {
            return NextResponse.json({ 
                success: false, 
                error: "Payment verification failed" 
            });
        }
    } catch (error) {
        console.error('Error in complete-payment:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || 'Payment completion failed'
        });
    }
}
