import React, { ReactNode } from 'react';
import Header from '@/components/Header';

type PageLayoutProps = {
    children: ReactNode;
    showHeader?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, showHeader = false }) => (
    <>
        {showHeader && <Header />}
        <main>{children}</main>
    </>
);

export default PageLayout;
