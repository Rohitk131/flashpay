import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/dbConnect';
import { hashPassword } from '@/lib/bcrypt';
import { generateToken } from '@/lib/auth';
import { z } from 'zod';

const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = signupBody.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Email already taken / Incorrect inputs"
            }, { status: 400 });
        }

        const { username, firstName, lastName, password } = parsedBody.data;

        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser) {
            return NextResponse.json({
                error: "Email already taken"
            }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: { username, firstName, lastName, password: hashedPassword },
        });

        await prisma.account.create({
            data: {
                userId: user.id,
                balance: 1 + Math.random() * 10000,
            },
        });

        const token = generateToken(user.id);

        return NextResponse.json({
            message: "User created successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}