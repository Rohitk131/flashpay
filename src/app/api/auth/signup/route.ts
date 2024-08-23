import { NextResponse } from 'next/server';
import Prisma from '@/lib/dbConnect';
import { hashPassword } from '@/lib/bcrypt';

export async function POST(request: Request) {
  try {
    const { username, password, firstName, lastName } = await request.json(); 
    
    const existingUser = await Prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    
    const hashedPassword = await hashPassword(password);

    
    const newUser = await Prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

   
    return NextResponse.json({
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error during user sign-up:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
