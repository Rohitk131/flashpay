import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';  // Import verifyToken function

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};