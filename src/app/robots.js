/**
 * src/app/robots.js
 * Generates /robots.txt. This and sitemap.js are the only source of truth for
 * crawling rules: do not add a robots.txt or sitemap.xml file to /public.
 */

import { SITE_URL } from '@/lib/seo';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Sanity Studio (admin) and API routes are not for search engines
                disallow: ['/studio', '/api/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
