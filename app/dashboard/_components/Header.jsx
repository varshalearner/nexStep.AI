"use client";
import { useState, useEffect, useRef } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const path = usePathname();
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Toggle menu state
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <header className="flex p-4 items-center justify-between bg-white dark:bg-gray-800 shadow-md relative">
            <Link href="/">
                <h1 className="text-3xl font-extrabold cursor-pointer text-gray-800 dark:text-white">
                    nexStep.AI
                </h1>
            </Link>

            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className="text-gray-800 dark:text-white md:hidden"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    ></path>
                </svg>
            </button>

            {/* Nav Links for Desktop */}
            <nav className="hidden md:flex md:items-center md:gap-8 md:justify-center flex-1">
                <ul className="flex flex-row gap-8">
                    <NavItem href="/dashboard" path={path} label="Dashboard" />
                    <NavItem href="/dashboard/upgrade" path={path} label="Upgrade" />
                    <NavItem href="/dashboard/how-it-works" path={path} label="How it Works?" />
                    <NavItem href="/dashboard/tracking-panel" path={path} label="Analytics" closeMenu={() => setMenuOpen(false)} />
                </ul>
            </nav>

            {/* User Button for Desktop */}
            <div className="hidden md:flex items-center gap-4">
                <UserButton />
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div ref={menuRef} className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col p-4 rounded-lg">
                    <nav>
                        <ul className="flex flex-col gap-4">
                            <NavItem href="/dashboard" path={path} label="Dashboard" closeMenu={() => setMenuOpen(false)} />
                            <NavItem href="/dashboard/upgrade" path={path} label="Upgrade" closeMenu={() => setMenuOpen(false)} />
                            <NavItem href="/dashboard/how-it-works" path={path} label="How it Works?" closeMenu={() => setMenuOpen(false)} />
                            <NavItem href="/dashboard/tracking-panel" path={path} label="Track" closeMenu={() => setMenuOpen(false)} />
                        </ul>
                    </nav>
                    <div className="mt-4 flex items-center gap-4">
                        <UserButton />
                    </div>
                </div>
            )}
        </header>
    );
}

function NavItem({ href, path, label, closeMenu }) {
    return (
        <li>
            <Link href={href} onClick={closeMenu} className={`block px-3 py-1 rounded-md cursor-pointer transition-all
                ${path === href ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}>
                {label}
            </Link>
        </li>
    );
}

export default Header;
