'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: 'Группы', href: '/' },
    { label: 'Каналы', href: '/channels' },
];

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <header className="flex lg:justify-center justify-end border-b bg-white font-sans tracking-wide relative z-50">
            <div className="flex items-center justify-between px-6 py-3 relative">
                <Navigation
                    items={navItems}
                    isMobile={menuOpen}
                    currentPath={pathname}
                    closeMenu={() => setMenuOpen(false)}
                />

                <button
                    id="toggleMenu"
                    onClick={toggleMenu}
                    className="lg:hidden rounded-full bg-white w-10 h-10 flex items-center justify-center border shadow-md z-[100]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 fill-black"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        ) : (
                            <path
                                d="M3 6h18M3 12h18m-18 6h18"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        )}
                    </svg>
                </button>

                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )}
            </div>
        </header>
    );
};

const Navigation: React.FC<{
    items: NavItem[];
    isMobile: boolean;
    currentPath: string;
    closeMenu: () => void;
}> = ({ items, isMobile, currentPath, closeMenu }) => (
    <nav
        id="navigationMenu"
        className={`${
            isMobile
                ? 'fixed top-0 left-0 bg-white w-3/4 max-w-sm h-full p-6 shadow-lg z-50 transform transition-transform duration-300'
                : 'hidden lg:flex lg:items-center lg:justify-center'
        } ${isMobile ? 'translate-x-0' : ''}`}
    >
        <ul className="space-y-4 lg:space-y-0 lg:flex lg:gap-8 lg:text-center text-start">
            {items.map(({ label, href }) => (
                <li key={href} className="text-[16px] font-bold">
                    <a
                        href={href}
                        onClick={closeMenu}
                        className={`${
                            currentPath === href ? 'text-[#007bff]' : 'text-gray-500'
                        } hover:text-[#007bff]`}
                    >
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default Header;
