import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
});
export const metadata = {
    metadataBase: new URL('https://www.yejzila.com'),
    title: 'Yejzila Resources Limited - Premier Oil, Gas, Energy & Mining Solutions',
    description:
        'Yejzila Resources Limited delivers expert procurement, supply chain, and workforce solutions for Oil & Gas, Energy, Mining sectors. Strategic sourcing, EPC support, renewable energy, and technical manpower services across Nigeria and UK.',
    keywords: 'Yejzila, oil and gas services, energy solutions, mining resources, procurement services, supply chain, workforce solutions, Nigeria, UK, renewable energy, technical manpower',
    authors: [{ name: 'Yejzila Resources Limited' }],
    alternates: {
        canonical: 'https://www.yejzila.com',
        languages: {
            'en-US': '/en-US',
        },
    },
    openGraph: {
        title: 'Yejzila Resources Limited - Premier Oil, Gas, Energy & Mining Solutions',
        description: 'Expert procurement, supply chain, and workforce solutions for Oil & Gas, Energy, Mining sectors. Unlocking Brilliance in Resource Management.',
        url: 'https://www.yejzila.com',
        siteName: 'Yejzila Resources Limited',
        images: [
            {
                url: 'https://www.yejzila.com/opengraph-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Yejzila Resources Limited - Oil, Gas, Energy & Mining Solutions',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yejzila Resources Limited - Premier Oil, Gas, Energy & Mining Solutions',
        description: 'Expert procurement, supply chain, and workforce solutions for Oil & Gas, Energy, Mining sectors.',
        creator: '@akbar_ob',
        images: {
            url: 'https://www.yejzila.com/twitter-image.jpg',
            alt: 'Yejzila Resources Limited Logo',
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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
        description: 'Premier Oil, Gas, Energy & Mining Solutions provider offering expert procurement, supply chain, and workforce solutions.',
        foundingDate: '2020',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '40 Shedrack Avenue, Apamini Estate, Rockword Junction',
            addressLocality: 'Elelenwo',
            addressRegion: 'Port Harcourt',
            addressCountry: 'Nigeria'
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+234-903-614-3222',
                contactType: 'customer service',
                areaServed: 'NG'
            },
            {
                '@type': 'ContactPoint',
                telephone: '+44-744-243-7146',
                contactType: 'customer service',
                areaServed: 'GB'
            }
        ],
        email: 'info@yejzila.com',
        sameAs: [
            'https://www.linkedin.com/company/yejzila-resources/',
            'https://www.instagram.com/yejzila_resources'
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
                        description: 'Strategic sourcing of equipment, machinery & materials'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Oil & Gas Services',
                        description: 'Oilfield equipment, drilling tools & rigs procurement'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Energy Services',
                        description: 'Renewable energy solutions and power generation equipment'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Mining & Mineral Resources',
                        description: 'Mining equipment, heavy machinery & spare parts supply'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Recruitment & Workforce Solutions',
                        description: 'Executive search & technical manpower supply'
                    }
                }
            ]
        }
    };

    return (
        <html lang='en'>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${roboto.className} relative flex-col flex`}>
                {children}
            </body>
        </html>
    );
}
