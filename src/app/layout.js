import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Yejzila",
    description: "Unlocking Brilliance",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta
                    name="description"
                    content={metadata.description}
                    key="description"
                />
                <meta
                    property="og:title"
                    content={metadata.title}
                    key="og-title"
                />
                <meta
                    property="og:description"
                    content={metadata.description}
                    key="og-description"
                />

                <meta property="og:site_name" content="Yejzila" key="og-site" />

                <meta
                    property="og:image"
                    content="https://www.imghippo.com/i/KWvKk1720516061.jpg"
                />

                <meta
                    name="twitter:image"
                    content="https://www.imghippo.com/i/KWvKk1720516061.jpg"
                />
                <meta
                    name="twitter:title"
                    content={metadata.title}
                    key="tw-title"
                />
                <meta
                    name="twitter:description"
                    content={metadata.description}
                    key="tw-desc"
                />
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                    key="tw-card"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div className="relative flex-col flex">
                <body className={inter.className}>{children}</body>
            </div>
        </html>
    );
}
