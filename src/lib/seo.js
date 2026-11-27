/**
 * src/lib/seo.js
 * Single source of truth for SEO: the canonical host, the default title and
 * description, and the builders for the JSON-LD structured data.
 *
 * SITE_URL must match the host the live site actually serves. Vercel
 * redirects https://yejzila.com to https://www.yejzila.com, so "www" is the
 * canonical host. If the primary domain is ever changed in Vercel, change it
 * here too (canonicals, sitemap, robots and JSON-LD all read this value).
 */

import { serviceGroups } from './services';

export const SITE_URL = 'https://www.yejzila.com';
export const SITE_NAME = 'Yejzila Resources Limited';
export const SITE_SHORT_NAME = 'Yejzila';

export const DEFAULT_TITLE =
    'Yejzila Resources Limited | Industrial Procurement & Supply Solutions';

export const DEFAULT_DESCRIPTION =
    'Yejzila Resources Limited is an industrial procurement and supply solutions company serving the oil & gas, energy and mining sectors.';

export const CAREERS_DESCRIPTION =
    'Explore career opportunities at Yejzila Resources Limited, an industrial procurement and supply solutions company serving the oil & gas, energy and mining sectors.';

// Served by the file convention at src/app/opengraph-image.png
export const OG_IMAGE = {
    url: '/opengraph-image.png',
    width: 1200,
    height: 631,
    alt: 'Yejzila Resources Limited logo with the tagline Unlocking Brilliance',
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Serialises structured data for a <script type="application/ld+json"> tag.
 * Escaping "<" stops CMS-supplied text from closing the script tag early.
 */
export function jsonLdScript(data) {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Organization + WebSite graph rendered on every page by the root layout. */
export function buildSiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: SITE_NAME,
                alternateName: [SITE_SHORT_NAME, 'Yejzila Resources'],
                url: SITE_URL,
                logo: `${SITE_URL}/assets/Navlogo.svg`,
                image: `${SITE_URL}${OG_IMAGE.url}`,
                slogan: 'Unlocking Brilliance',
                description: DEFAULT_DESCRIPTION,
                email: 'info@yejzila.com',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress:
                        '40 Shedrack Avenue, Apamini Estate, Rockword Junction, Elelenwo',
                    addressLocality: 'Port Harcourt',
                    addressCountry: 'NG',
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
                sameAs: [
                    'https://www.linkedin.com/company/yejzila-resources-limited/',
                    'https://www.instagram.com/yejzila',
                ],
                // Mirrors the capability groups shown on the home page
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Procurement & Supply Capabilities',
                    itemListElement: serviceGroups.map((group) => ({
                        '@type': 'OfferCatalog',
                        name: group.title,
                        url: `${SITE_URL}/#${group.slug}`,
                        itemListElement: group.items.map((item) => ({
                            '@type': 'Offer',
                            itemOffered: { '@type': 'Service', name: item },
                        })),
                    })),
                },
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: SITE_URL,
                name: SITE_NAME,
                alternateName: SITE_SHORT_NAME,
                inLanguage: 'en',
                publisher: { '@id': ORGANIZATION_ID },
            },
        ],
    };
}

// Sanity employmentType values -> schema.org / Google employmentType values
const EMPLOYMENT_TYPES = {
    'Full-time': 'FULL_TIME',
    'Part-time': 'PART_TIME',
    Contract: 'CONTRACTOR',
    Internship: 'INTERN',
};

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/** Flattens Sanity portable text blocks into simple <p> paragraphs. */
function portableTextToHtml(blocks) {
    if (!Array.isArray(blocks)) return '';
    return blocks
        .filter((block) => block?._type === 'block')
        .map((block) =>
            (block.children || [])
                .map((child) => child?.text || '')
                .join('')
                .trim(),
        )
        .filter(Boolean)
        .map((text) => `<p>${escapeHtml(text)}</p>`)
        .join('');
}

function listToHtml(heading, items) {
    if (!Array.isArray(items) || items.length === 0) return '';
    const rows = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    return `<p><strong>${heading}</strong></p><ul>${rows}</ul>`;
}

/**
 * Builds JobPosting structured data from a Sanity job listing.
 * Uses only what the listing really holds. Returns null (no markup) when a
 * field Google requires is missing or the deadline has passed. The salary is
 * left out on purpose: `salaryRange` is free text such as "Competitive", which
 * cannot be expressed honestly as a numeric baseSalary.
 */
export function buildJobPostingJsonLd(job) {
    if (!job?.title || !job?.postedAt || !job?.location) return null;
    if (job.deadline && new Date(job.deadline) < new Date()) return null;

    const description =
        portableTextToHtml(job.description) +
        listToHtml('Responsibilities', job.responsibilities) +
        listToHtml('Requirements', job.requirements);
    if (!description) return null;

    // `location` is one free-text field, e.g. "Port Harcourt, Nigeria".
    // Split out a country only when it is written after a comma.
    const parts = job.location
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
    const address = { '@type': 'PostalAddress', addressLocality: parts[0] };
    if (parts.length > 1) address.addressCountry = parts[parts.length - 1];

    const data = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description,
        datePosted: job.postedAt,
        hiringOrganization: {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: SITE_NAME,
            sameAs: SITE_URL,
            logo: `${SITE_URL}/assets/Navlogo.svg`,
        },
        jobLocation: { '@type': 'Place', address },
        directApply: true,
        url: `${SITE_URL}/careers/${job.slug?.current || ''}`,
        identifier: {
            '@type': 'PropertyValue',
            name: SITE_NAME,
            value: job._id,
        },
    };

    if (job.deadline) data.validThrough = job.deadline;
    if (EMPLOYMENT_TYPES[job.employmentType]) {
        data.employmentType = EMPLOYMENT_TYPES[job.employmentType];
    }
    if (job.department) data.occupationalCategory = job.department;

    return data;
}
