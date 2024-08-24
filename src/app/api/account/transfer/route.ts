import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/dbConnect';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        const { amount, to } = await req.json();

        // Validate input
        if (!amount || amount <= 0 || !to) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const result = await prisma.$transaction(async (tx) => {
            // Retrieve the account of the sender
            const senderAccount = await tx.account.findFirst({
                where: { userId: userId },
            });

            if (!senderAccount || senderAccount.balance < amount) {
                throw new Error("Insufficient balance");
            }

            // Retrieve the account of the recipient
            const recipientAccount = await tx.account.findFirst({
                where: { userId: to },
            });

            if (!recipientAccount) {
                throw new Error("Invalid recipient account");
            }

            // Deduct from sender's account
            const updatedSenderAccount = await tx.account.update({
                where: { id: senderAccount.id },
                data: { balance: { decrement: amount } },
            });

            // Add to recipient's account
            const updatedRecipientAccount = await tx.account.update({
                where: { id: recipientAccount.id },
                data: { balance: { increment: amount } },
            });

            return { 
                message: "Transfer successful",
                senderBalance: updatedSenderAccount.balance,
                recipientBalance: updatedRecipientAccount.balance
            };
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Transaction error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message || "Transfer failed" }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}