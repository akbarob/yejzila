import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://yejzila.com'),
    title: {
        default: 'Yejzila Resources Limited | Oil, Gas, Energy & Mining',
        template: '%s | Yejzila Resources Limited',
    },
    description:
        'Yejzila Resources Limited offers specialized services in exploration, extraction, and distribution of natural resources — committed to safety, sustainability, and innovation.',
    keywords: [
        'oil and gas company Nigeria',
        'mining services',
        'energy company',
        'oil exploration',
        'natural resources',
        'Yejzila',
        'engineering services',
        'offshore drilling',
    ],
    authors: [{ name: 'Yejzila Resources Limited', url: 'https://yejzila.com' }],
    creator: 'Yejzila Resources Limited',
    publisher: 'Yejzila Resources Limited',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://yejzila.com',
    },
    alternates: {
        canonical: 'https://yejzila.com',
    },
    openGraph: {
        title: 'Yejzila Resources Limited | Oil, Gas, Energy & Mining',
        description:
            'Yejzila Resources Limited — Unlocking Brilliance. Specialized services in oil, gas, energy, and mining sectors.',
        url: 'https://yejzila.com',
        siteName: 'Yejzila Resources Limited',
        images: [
            {
                url: 'https://www.imghippo.com/i/iglOM1720687574.png',
                width: 1200,
                height: 630,
                alt: 'Yejzila Resources Limited',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yejzila Resources Limited | Oil, Gas, Energy & Mining',
        description:
            'Yejzila Resources Limited — Unlocking Brilliance. Specialized services in oil, gas, energy, and mining sectors.',
        creator: '@akbar_ob',
        images: [
            {
                url: 'https://www.imghippo.com/i/iglOM1720687574.png',
                alt: 'Yejzila Resources Limited',
            },
        ],
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Yejzila Resources Limited',
        alternateName: 'Yejzila',
        url: 'https://www.yejzila.com',
        logo: 'https://www.yejzila.com/assets/Navlogo.svg',
        description:
            'Premier Oil, Gas, Energy & Mining Solutions provider offering expert procurement, supply chain, and workforce solutions.',
        foundingDate: '2020',
        address: {
            '@type': 'PostalAddress',
            streetAddress:
                '40 Shedrack Avenue, Apamini Estate, Rockword Junction',
            addressLocality: 'Elelenwo',
            addressRegion: 'Port Harcourt',
            addressCountry: 'Nigeria',
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+234-903-614-3222',
                contactType: 'customer service',
                areaServed: 'NG',
            },
            {
                '@type': 'ContactPoint',
                telephone: '+44-744-243-7146',
                contactType: 'customer service',
                areaServed: 'GB',
            },
        ],
        email: 'info@yejzila.com',
        sameAs: [
            'https://www.linkedin.com/company/yejzila-resources/',
            'https://www.instagram.com/yejzila_resources',
        ],
        serviceArea: ['Nigeria', 'United Kingdom'],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Yejzila Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Procurement & Supply Chain Solutions',
                        description:
                            'Strategic sourcing of equipment, machinery & materials',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Oil & Gas Services',
                        description:
                            'Oilfield equipment, drilling tools & rigs procurement',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Energy Services',
                        description:
                            'Renewable energy solutions and power generation equipment',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Mining & Mineral Resources',
                        description:
                            'Mining equipment, heavy machinery & spare parts supply',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Recruitment & Workforce Solutions',
                        description:
                            'Executive search & technical manpower supply',
                    },
                },
            ],
        },
    };

    return (
        <html lang='en'>
            <body className={`${inter.className} relative flex-col flex`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
