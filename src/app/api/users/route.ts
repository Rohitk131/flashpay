import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || "";

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { firstName: { contains: filter, mode: "insensitive" } },
                    { lastName: { contains: filter, mode: "insensitive" } },
                ],
            },
        });

        return NextResponse.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user.id,
            })),
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
