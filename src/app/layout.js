import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
});
export const metadata = {
    metadataBase: new URL('https://yejzila.com'),
    title: 'A premier diverse company specializing in Oil, Gas, Energy, and Minin',
    description:
        'YEJZILA offers specialized services in exploration, extraction, and distribution of natural resources, committed to environmental sustainability.',
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
        },
    },
    openGraph: {
        title: 'Yejzila Resources Limited',
        description: 'Yejzila Resources Limited, Unlocking Brilliance ',
        url: 'https://yejzila.com',
        siteName: 'Yejzila',
        images: [
            {
                url: 'https://www.imghippo.com/i/iglOM1720687574.png', // Must be an absolute URL
                width: 800,
                height: 600,
            },
            {
                url: 'https://https://www.imghippo.com/i/iglOM1720687574.png', // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: 'jajzilaimage',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yejzila Resources Limited',
        description: 'Yejzila Resources Limited, Unlocking Brilliance',
        creator: '@akbar_ob',
        images: {
            url: 'https://www.imghippo.com/i/iglOM1720687574.png',
            alt: 'Yejzila Logo',
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            {/* <div className=""> */}
            <body className={`${roboto.className} relative flex-col flex`}>
                {children}
            </body>
            {/* </div> */}
        </html>
    );
}
