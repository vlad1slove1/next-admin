import { JWT_SECRET } from '@/utils/const';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');
    const loginUrl = new URL('/login', req.url);
    const homeUrl = new URL('/', req.url);

    if (!tokenCookie?.value) {
        if (req.nextUrl.pathname === '/login') {
            return NextResponse.next();
        }
        return NextResponse.redirect(loginUrl);
    }

    const token = tokenCookie.value;

    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

        if (req.nextUrl.pathname === '/login') {
            return NextResponse.redirect(homeUrl);
        }
        return NextResponse.next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/'],
};
