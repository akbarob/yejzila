import { Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({
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
    return (
        <html lang='en'>
            <body className={`${sora.className} relative flex-col flex`}>
                {children}
            </body>
        </html>
    );
}
