import ContextProvider from '@/providers/ContextProvider';
import { NextUIProvider } from '@nextui-org/react';
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
        <html lang="en">
            <body>
                <NextUIProvider>
                    <ContextProvider>{children}</ContextProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
