import postgres from '@/lib/postgres';
import { User } from '@/models/user/userModel';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests to /api/users
export async function GET() {
    try {
        const users = await postgres.getAll<User>('tg_user');
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}

// Handle POST requests to /api/users
export async function POST(request: NextRequest) {
    try {
        const user = await request.json();
        const newUser = await postgres.insert<User>(
            'tg_user',
            ['name', 'email'],
            [user.name, user.email]
        );
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
