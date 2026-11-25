'use client';
import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ChevronRight, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileNav({ links, contactLink, pathname }) {
    const [open, setOpen] = useState(false);

    const isActive = (link, index) =>
        link.link === '/careers'
            ? pathname?.startsWith('/careers')
            : index === 0 && pathname === '/';

    return (
        <div className='lg:hidden'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button
                        type='button'
                        aria-label='Open menu'
                        className='inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:border-primary100 hover:text-primary100 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary100'>
                        <RxHamburgerMenu size={22} aria-hidden='true' />
                    </button>
                </SheetTrigger>

                <SheetContent
                    side='right'
                    className='flex w-[86vw] max-w-[340px] flex-col gap-0 border-l border-white/10 bg-navy900 p-0 text-white [&>button]:right-4 [&>button]:top-5 [&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-xl [&>button]:border [&>button]:border-white/15 [&>button]:text-white [&>button]:opacity-100 [&>button_svg]:h-5 [&>button_svg]:w-5'>
                    {/* Header */}
                    <SheetHeader className='flex h-20 flex-row items-center space-y-0 border-b border-white/10 px-6'>
                        <SheetTitle>
                            <Image
                                src='/assets/Navlogo.svg'
                                alt='Yejzila logo'
                                width={300}
                                height={300}
                                className='h-auto w-[120px] object-contain'
                            />
                        </SheetTitle>
                        <SheetDescription className='sr-only'>
                            Site navigation
                        </SheetDescription>
                    </SheetHeader>

                    {/* Nav links */}
                    <nav
                        aria-label='Mobile'
                        className='flex flex-1 flex-col overflow-y-auto px-3 py-4'>
                        {links.map((link, i) => {
                            const active = isActive(link, i);
                            return (
                                <Link
                                    href={link.link}
                                    key={link.title}
                                    onClick={() => setOpen(false)}
                                    aria-current={active ? 'page' : undefined}
                                    className={`group flex min-h-[52px] items-center justify-between rounded-xl px-4 text-[17px] font-semibold transition-colors duration-200 hover:bg-white/5 hover:text-primary100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary100 ${
                                        active
                                            ? 'bg-primary100/10 text-primary100'
                                            : 'text-white'
                                    }`}>
                                    {link.title}
                                    <ChevronRight
                                        size={18}
                                        aria-hidden='true'
                                        className='text-white/30 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-primary100'
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Contact */}
                    <div className='space-y-4 border-t border-white/10 px-6 py-6'>
                        <Link
                            href={contactLink.link}
                            onClick={() => setOpen(false)}
                            className='flex h-12 items-center justify-center rounded-full bg-primary100 text-[16px] font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-[#ffb93f] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                            {contactLink.title}
                        </Link>
                        <div className='space-y-1 text-[14px] text-white/70'>
                            <a
                                href='mailto:info@yejzila.com'
                                className='flex min-h-[40px] items-center gap-3 transition-colors duration-200 hover:text-white'>
                                <Mail
                                    size={16}
                                    aria-hidden='true'
                                    className='text-primary100'
                                />
                                info@yejzila.com
                            </a>
                            <a
                                href='tel:+2349036143222'
                                className='flex min-h-[40px] items-center gap-3 tabular-nums transition-colors duration-200 hover:text-white'>
                                <Phone
                                    size={16}
                                    aria-hidden='true'
                                    className='text-primary100'
                                />
                                +234 903 614 3222
                            </a>
                        </div>
                        <p className='text-[12px] text-white/40'>
                            © {new Date().getFullYear()} Yejzila. All rights
                            reserved.
                        </p>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
