import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const PI_SERVER_API_KEY = process.env.PI_SERVER_API_KEY;
    const { paymentId } = await request.json();
    console.log(paymentId)
    if (!PI_SERVER_API_KEY) {
        console.error('PI_SERVER_API_KEY is not set');
        return new NextResponse(JSON.stringify({ success: false, error: 'PI_SERVER_API_KEY is not set' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/approve`,
            {},
            {
                headers: {
                    Authorization: `Key ${PI_SERVER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Payment approved:', response.data);
        return NextResponse.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error approving payment:', error.response ? error.response.data : error.message);
        return new NextResponse(JSON.stringify({ success: false, error: error.response ? error.response.data : error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
