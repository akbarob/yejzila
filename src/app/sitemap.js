/**
 * src/app/sitemap.js
 * Generates /sitemap.xml: the home page, the careers page and every active
 * job listing in Sanity. /studio and /api are never listed.
 */

import { SITE_URL } from '@/lib/seo';
import { getActiveJobs } from '@/lib/sanity';

// Rebuild at most once an hour so new job listings appear without a redeploy
export const revalidate = 3600;

export default async function sitemap() {
    let jobs = [];
    try {
        jobs = await getActiveJobs();
    } catch (error) {
        // If Sanity is unreachable, still serve the static pages
        console.error('sitemap: could not load job listings', error);
    }

    const now = new Date();
    const jobPages = jobs
        .filter((job) => job?.slug?.current)
        // Closed listings stay off the sitemap
        .filter((job) => !job.deadline || new Date(job.deadline) >= now)
        .map((job) => ({
            url: `${SITE_URL}/careers/${job.slug.current}`,
            lastModified: job.postedAt ? new Date(job.postedAt) : undefined,
            changeFrequency: 'weekly',
            priority: 0.6,
        }));

    return [
        { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
        {
            url: `${SITE_URL}/careers`,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...jobPages,
    ];
}
