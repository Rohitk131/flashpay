import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/dbConnect';
import { verifyToken } from '@/lib/auth'; // Adjust this import based on your project

export async function GET(request: NextRequest) {
    try {
        // Extract token from Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        const decodedToken = verifyToken(token); // Verify and decode the token
        
        if (!decodedToken || !decodedToken.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = decodedToken.userId;

        // Find the first account by userId
        const account = await prisma.account.findFirst({
            where: { userId: userId } // Adjust if needed
        });

        if (!account) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        // Return the balance
        return NextResponse.json({
            balance: account.balance
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
