'use client';

import ContextProvider from '@/providers/ContextProvider';
import React, { ReactNode, StrictMode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Props = {
    children: ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
    const router = useRouter();

    return (
        <StrictMode>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    <ContextProvider>{children}</ContextProvider>
                </NextThemesProvider>
            </NextUIProvider>
        </StrictMode>
    );
};

export default Providers;
