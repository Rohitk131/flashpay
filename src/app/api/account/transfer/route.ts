import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
    const session = await getSession({ req });

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { amount, to } = await req.json();
        const userId = session.user.id;

        const prismaSession = await prisma.$transaction(async (tx) => {
            // Retrieve the account of the sender
            const account = await tx.account.findUnique({
                where: { userId },
            });

            if (!account || account.balance < amount) {
                throw new Error("Insufficient balance");
            }

            // Retrieve the account of the recipient
            const toAccount = await tx.account.findUnique({
                where: { userId: to },
            });

            if (!toAccount) {
                throw new Error("Invalid account");
            }

            // Deduct from sender's account
            await tx.account.update({
                where: { userId },
                data: { balance: { decrement: amount } },
            });

            // Add to recipient's account
            await tx.account.update({
                where: { userId: to },
                data: { balance: { increment: amount } },
            });

            return { message: "Transfer successful" };
        });

        return NextResponse.json(prismaSession);

    } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({ message: "Transfer failed" }, { status: 500 });
    }
}
