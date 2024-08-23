import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/dbConnect';
import { comparePassword } from '@/lib/bcrypt';
import { generateToken } from '@/lib/auth';
import { z } from 'zod';

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = signinBody.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { username, password } = parsedBody.data;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !(await comparePassword(password, user.password))) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const token = generateToken(user.id);

        return NextResponse.json({
            token,
            user: { id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName },
        });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
