import Prisma from '@/lib/dbConnect';
import { comparePassword } from '@/lib/bcrypt';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await Prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = generateToken(user.id);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
