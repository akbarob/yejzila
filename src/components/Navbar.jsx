/**
 * Navbar component for global site navigation.
 *
 * User Story:
 * As a user, I want to navigate the application easily.
 *
 * Acceptance criteria: Unit testing has been completed and Regression testing has been completed
 */
'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

// Navigation links — "Careers" routes users to the /careers page
const links = [
    { title: 'Home', link: '/' },
    { title: 'About us', link: '/#aboutus' },
    { title: 'Projects', link: '/' },
    { title: 'Services', link: '/#services' },
    { title: 'Careers', link: '/careers' },
];

const contactLink = { title: 'Contact Us', link: '/#contactus' };

export default function Navbar() {
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Solid bar once the page has moved off the very top
            setScrolled(currentScrollY > 50);

            // Hide while scrolling down the page, show again on scroll up
            if (currentScrollY <= 300) {
                setHidden(false);
            } else if (currentScrollY > lastScrollY + 4) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY - 4) {
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Only whole-page links can be "current"; section links share the home path
    const isActive = (link, index) =>
        link.link === '/careers'
            ? pathname.startsWith('/careers')
            : index === 0 && pathname === '/';

    return (
        <nav
            aria-label='Main'
            className={`fixed inset-x-0 top-0 z-50 text-white transition-[transform,background-color,box-shadow,height] duration-300 ease-out motion-reduce:transition-none ${
                hidden ? '-translate-y-full' : 'translate-y-0'
            } ${
                scrolled
                    ? 'h-[64px] bg-navy900/90 shadow-lg shadow-black/20 backdrop-blur-md'
                    : 'h-[80px] bg-gradient-to-b from-black/60 to-transparent'
            }`}>
            <div className='flex h-full items-center justify-between gap-6 px-5 lg:px-28 xl:px-40'>
                <Link
                    href='/'
                    aria-label='Yejzila home'
                    className='shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary100'>
                    <Image
                        src='/assets/Navlogo.svg'
                        alt='Yejzila logo'
                        width={300}
                        height={300}
                        priority
                        className={`h-auto object-contain transition-[width] duration-300 ease-out ${
                            scrolled
                                ? 'w-[92px] lg:w-[112px]'
                                : 'w-[100px] lg:w-[140px]'
                        }`}
                    />
                </Link>

                {/* DESKTOP NAV */}
                <div className='hidden items-center gap-8 lg:flex'>
                    <ul className='flex items-center gap-8 text-[15px] font-semibold'>
                        {links.map((link, i) => {
                            const active = isActive(link, i);
                            return (
                                <li key={link.title}>
                                    <Link
                                        href={link.link}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={`group relative block rounded-sm py-2 transition-colors duration-200 hover:text-primary100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary100 ${
                                            active
                                                ? 'text-primary100'
                                                : 'text-white'
                                        }`}>
                                        {link.title}
                                        <span
                                            aria-hidden='true'
                                            className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary100 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                                                active
                                                    ? 'scale-x-100'
                                                    : 'scale-x-0'
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href={contactLink.link}
                        className='inline-flex h-10 items-center rounded-full bg-primary100 px-5 text-[15px] font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-[#ffb93f] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                        {contactLink.title}
                    </Link>
                </div>

                {/* MOBILE */}
                <MobileNav
                    links={links}
                    contactLink={contactLink}
                    pathname={pathname}
                />
            </div>
        </nav>
    );
}
