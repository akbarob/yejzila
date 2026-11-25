import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import {
    SITE_URL,
    SITE_NAME,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    OG_IMAGE,
    buildSiteJsonLd,
    jsonLdScript,
} from '@/lib/seo';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: DEFAULT_TITLE,
        template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [
        'Yejzila',
        'Yejzila Resources',
        'Yejzila Resources Limited',
        'industrial procurement',
        'procurement and supply solutions',
        'oil and gas procurement',
        'energy and mining supplies',
        'oilfield supplies',
        'supply chain services',
        'procurement company Port Harcourt',
        'procurement company Nigeria',
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
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
    // No canonical here on purpose: a canonical set in the root layout is
    // inherited by every page and would point them all at the home page.
    // Each page sets its own (see page.js and the careers pages).
    openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: '/',
        siteName: SITE_NAME,
        images: [OG_IMAGE],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: [OG_IMAGE],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} relative flex-col flex`}>
                {/* Organization + WebSite structured data for search engines */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: jsonLdScript(buildSiteJsonLd()),
                    }}
                />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
