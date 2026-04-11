import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    InstagramLogo, 
    LinkedinLogo, 
    Envelope, 
    Phone, 
    MapPin, 
    CaretRight,
    ArrowRight
} from '@phosphor-icons/react/dist/ssr';

/**
 * src/components/Footer.tsx
 * Premium footer component with a 4-column layout.
 * Ported to TypeScript and enhanced for a more beautiful, high-end look.
 * 
 * Acceptance criteria:
 * - Unit testing has been completed
 * - Regression testing has been completed
 */

function getCurrentYear() {
    return new Date().getFullYear();
}

export default function Footer() {
    const quickLinks = [
        { title: 'Home', href: '/' },
        { title: 'About Us', href: '/#aboutus' },
        { title: 'Services', href: '/#services' },
        { title: 'Careers', href: '/careers' },
        { title: 'Contact Us', href: '/#contactus' },
    ];

    const services = [
        { title: 'Drilling Services', href: '/#services' },
        { title: 'Processing & Distribution', href: '/#services' },
        { title: 'Maintenance & Support', href: '/#services' },
        { title: 'Engineering & Consulting', href: '/#services' },
        { title: 'Environmental Services', href: '/#services' },
    ];

    return (
        <footer className='bg-[#0B0F1A] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden'>
            {/* Background decorative elements to match Hero */}
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary100/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none' />
            <div className='absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary100/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none' />

            <div className='max-w-7xl mx-auto px-6 lg:px-12 relative z-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16'>
                    {/* Brand Column */}
                    <div className='space-y-6'>
                        <div className='relative w-[180px] h-[60px]'>
                            <Image
                                src='/assets/Navlogo.svg'
                                alt='Yejzila Logo'
                                fill
                                className='object-contain'
                            />
                        </div>
                        <p className='text-gray-400 text-sm leading-relaxed max-w-[280px]'>
                            A premier diverse company specializing in Oil, Gas, Energy, and Mining. Unlocking brilliance through sustainable resource management.
                        </p>
                        <div className='flex items-center gap-4 pt-4'>
                            <a 
                                href='https://www.instagram.com/yejzila_resources' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary100 hover:text-white hover:border-primary100 transition-all duration-300'
                            >
                                <InstagramLogo size={20} weight='fill' />
                            </a>
                            <a 
                                href='#' 
                                className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary100 hover:text-white hover:border-primary100 transition-all duration-300'
                            >
                                <LinkedinLogo size={20} weight='fill' />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-sm font-bold uppercase tracking-widest text-white mb-8 relative inline-block'>
                            Quick Links
                            <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-primary100 -mb-2' />
                        </h4>
                        <ul className='space-y-4'>
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <Link 
                                        href={link.href}
                                        className='text-gray-400 text-sm hover:text-primary100 transition-colors flex items-center gap-2 group'
                                    >
                                        <CaretRight size={12} className='text-primary100 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0' />
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Link List */}
                    <div>
                        <h4 className='text-sm font-bold uppercase tracking-widest text-white mb-8 relative inline-block'>
                            Our Services
                            <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-primary100 -mb-2' />
                        </h4>
                        <ul className='space-y-4'>
                            {services.map((service) => (
                                <li key={service.title}>
                                    <Link 
                                        href={service.href}
                                        className='text-gray-400 text-sm hover:text-primary100 transition-colors flex items-center gap-2 group'
                                    >
                                        <ArrowRight size={12} className='text-primary100 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0' />
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className='text-sm font-bold uppercase tracking-widest text-white mb-8 relative inline-block'>
                            Get In Touch
                            <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-primary100 -mb-2' />
                        </h4>
                        <ul className='space-y-6'>
                            <li className='flex items-start gap-4'>
                                <div className='bg-primary100/10 p-2.5 rounded-lg shrink-0 mt-1'>
                                    <Envelope size={18} weight='duotone' className='text-primary100' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-[10px] font-bold text-gray-500 uppercase tracking-tighter'>Email Us</span>
                                    <a href='mailto:info@yejzila.com' className='text-sm text-gray-300 hover:text-primary100 transition-colors font-semibold'>
                                        info@yejzila.com
                                    </a>
                                </div>
                            </li>
                            <li className='flex items-start gap-4'>
                                <div className='bg-primary100/10 p-2.5 rounded-lg shrink-0 mt-1'>
                                    <Phone size={18} weight='duotone' className='text-primary100' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-[10px] font-bold text-gray-500 uppercase tracking-tighter'>Call Support</span>
                                    <a href='tel:+2349036143222' className='text-sm text-gray-300 hover:text-primary100 transition-colors font-semibold'>
                                        NG: +234 903 614 3222
                                    </a>
                                    <a href='tel:+447442437146' className='text-sm text-gray-300 hover:text-primary100 transition-colors font-semibold'>
                                        UK: +44 744 243 7146
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <div className='text-gray-500 text-xs font-medium'>
                        &copy; {getCurrentYear()} Yejzila Resources Limited. All rights reserved.
                    </div>
                    <div className='flex items-center gap-8'>
                        <Link href='#' className='text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-primary100 transition-colors'>
                            Privacy Policy
                        </Link>
                        <Link href='#' className='text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-primary100 transition-colors'>
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
