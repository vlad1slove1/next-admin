import postgres from '@/lib/postgres';
import { UserField } from '@/models/user/userField';
import { User } from '@/models/user/userModel';
import { NextRequest, NextResponse } from 'next/server';

// Handle PUT requests to /api/users/[id]
export async function PUT(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user: User = await request.json();
        const updatedUser = await postgres.update<User>(
            'tg_user',
            Number(id),
            [UserField.CHAT_ID, UserField.NAME, UserField.ACTIVE],
            [user.chat_id, user.name, user.active]
        );
        return updatedUser
            ? NextResponse.json(updatedUser, { status: 200 })
            : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
    }
}

// Handle DELETE requests to /api/users/[id]
export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const deletedUser = await postgres.delete<User>('tg_user', Number(id));
        return deletedUser
            ? NextResponse.json(deletedUser, { status: 200 })
            : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
