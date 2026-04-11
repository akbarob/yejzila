/**
 * src/lib/sanity.ts
 * Configured Sanity client for fetching data from Sanity.io.
 * Exports: `client` for GROQ queries, `urlFor` for image URL generation,
 * and pre-built GROQ query functions for the careers pages.
 * The write token is NOT imported here — it's used only in the API route (server-side).
 */

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ── Sanity project config ─────────────────────────────────────────────────────
export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id').trim();
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01'; // Always pin to a specific API version

// Read-only Sanity client used on public pages for data fetching
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Cache responses for read-heavy pages
});

// ── Image URL builder ─────────────────────────────────────────────────────────
const builder = imageUrlBuilder(client);

/** Generate a Sanity CDN image URL from an image reference object. */
export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// ── GROQ Queries ──────────────────────────────────────────────────────────────

/**
 * Fetches all active job listings, ordered by most recently posted.
 * Only returns jobs where `isActive == true`.
 */
export async function getActiveJobs() {
    const query = `*[_type == "jobListing" && isActive == true] | order(postedAt desc) {
        _id,
        title,
        slug,
        department,
        location,
        employmentType,
        salaryRange,
        deadline,
        postedAt
    }`;

    return client.fetch(query);
}

/**
 * Fetches a single job listing by its slug.
 * Returns the full document including rich text description, requirements, and responsibilities.
 * Returns null if not found or inactive.
 */
export async function getJobBySlug(slug: string) {
    const query = `*[_type == "jobListing" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        slug,
        department,
        location,
        employmentType,
        description,
        requirements,
        responsibilities,
        salaryRange,
        deadline,
        postedAt
    }`;

    return client.fetch(query, { slug });
}

/**
 * Fetches all unique departments, locations, and employment types for the filter UI.
 * Used by JobFilters component to populate dropdown options dynamically.
 */
export async function getFilterOptions() {
    const query = `{
        "departments": *[_type == "jobListing" && isActive == true].department,
        "locations": *[_type == "jobListing" && isActive == true].location,
        "employmentTypes": *[_type == "jobListing" && isActive == true].employmentType
    }`;

    const raw = await client.fetch<{
        departments: string[];
        locations: string[];
        employmentTypes: string[];
    }>(query);

    return {
        departments: [...new Set(raw.departments)].sort(),
        locations: [...new Set(raw.locations)].sort(),
        employmentTypes: [...new Set(raw.employmentTypes)].sort(),
    };
}

/**
 * Fetches all active Talent Pipeline categories.
 */
export async function getPipelineCategories() {
    const query = `*[_type == "pipelineCategory" && isActive == true] | order(title asc) {
        _id,
        title,
        slug,
        description
    }`;

    return client.fetch(query);
}
