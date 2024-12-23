import postgres from '@/lib/postgres';
import { Setting } from '@/models/setting';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Function to get settings based on provided keys
const getSettings = async (keys: string[]): Promise<Map<string, string>> => {
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const queryText = `
        SELECT key, value
        FROM settings
        WHERE key IN (${placeholders})
    `;
    const result = await postgres.sql<Setting>(queryText, keys);
    return new Map(result.map(({ key, value }) => [key, value]));
};

// Function to update or insert settings
const updateSettings = async (settings: Setting[]): Promise<void> => {
    const updatePromises = settings.map(({ key, value }) =>
        postgres.sql(
            `
                INSERT INTO settings (key, value)
                VALUES ($1, $2)
                ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
            `,
            [key, value]
        )
    );
    await Promise.all(updatePromises);
};

// Handler for GET requests
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const keys = searchParams.get('keys')?.split(',') || [];

        if (keys.length === 0) {
            return NextResponse.json(
                { error: 'Keys must be provided as a comma-separated string.' },
                { status: 400 }
            );
        }

        const settingsMap = await getSettings(keys);
        const settingsObject = Object.fromEntries(settingsMap);

        return NextResponse.json(settingsObject, { status: 200 });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handler for PUT requests
export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const settings: Setting[] = await req.json();

        if (!Array.isArray(settings) || !settings.every(({ key, value }) => key && value)) {
            return NextResponse.json(
                {
                    error: 'Settings should be an array of key-value pairs with both key and value present.',
                },
                { status: 400 }
            );
        }

        await updateSettings(settings);
        return NextResponse.json({ message: 'Settings updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
