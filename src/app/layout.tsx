import ContextProvider from '@/providers/ContextProvider';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={inter.className}>
                <NextUIProvider>
                    <ContextProvider>{children}</ContextProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
