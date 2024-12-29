import Providers from '@/app/providers';
import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
    title: 'TG-bot admin-panel',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
