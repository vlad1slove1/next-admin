import postgres from '@/lib/postgres';
import { AdminModel } from '@/models/admins/adminModel';
import { JWT_SECRET } from '@/utils/const';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
    }

    try {
        const result = await postgres.sql<AdminModel>(`SELECT * FROM admin WHERE username = $1`, [
            username,
        ]);

        if (result.length === 0) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '7d',
        });

        const response = NextResponse.json({ message: 'Login successful', token });
        response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
