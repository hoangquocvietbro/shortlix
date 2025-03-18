import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1]; // Extract token

    if (!accessToken) {
        return new NextResponse(JSON.stringify({ success: false, error: 'No access token provided' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const response = await axios.get('https://api.minepi.com/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('User data retrieved:', response.data);
        return NextResponse.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error retrieving user data:', error.response ? error.response.data : error.message);
        return new NextResponse(JSON.stringify({ success: false, error: error.response ? error.response.data : error.message }), {
            status: error.response?.status || 500, // Use the Pi API's status code, or 500 if unavailable
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
