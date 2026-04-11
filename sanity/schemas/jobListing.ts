/**
 * sanity/schemas/jobListing.ts
 * Schema for job listings managed through Sanity Studio.
 * The `isActive` boolean toggle controls whether a job appears on the public /careers page.
 * `slug` is auto-generated from the title and used as the URL path for /careers/[slug].
 */

import { defineType, defineField } from 'sanity';

export const jobListing = defineType({
    name: 'jobListing',
    title: 'Job Listing',
    type: 'document',
    fields: [
        // Job title — e.g. "Senior Procurement Officer"
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(3).max(100),
        }),

        // Auto-generated URL slug from title — used in /careers/[slug] route
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        // Business department — e.g. "Oil & Gas", "Mining", "Energy"
        defineField({
            name: 'department',
            title: 'Department',
            type: 'string',
            options: {
                list: [
                    { title: 'Oil & Gas', value: 'Oil & Gas' },
                    { title: 'Mining', value: 'Mining' },
                    { title: 'Energy', value: 'Energy' },
                    { title: 'Operations', value: 'Operations' },
                    { title: 'Finance', value: 'Finance' },
                    { title: 'Administration', value: 'Administration' },
                    { title: 'Technology', value: 'Technology' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        // Physical location — e.g. "Port Harcourt, Nigeria"
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        // Employment type
        defineField({
            name: 'employmentType',
            title: 'Employment Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Full-time', value: 'Full-time' },
                    { title: 'Part-time', value: 'Part-time' },
                    { title: 'Contract', value: 'Contract' },
                    { title: 'Internship', value: 'Internship' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        // Rich text job description using the blockContent schema
        defineField({
            name: 'description',
            title: 'Job Description',
            type: 'blockContent',
        }),

        // Array of plain string requirements
        defineField({
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        // Array of plain string responsibilities
        defineField({
            name: 'responsibilities',
            title: 'Responsibilities',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        // Optional salary — e.g. "Competitive" or "₦500,000 – ₦700,000/month"
        defineField({
            name: 'salaryRange',
            title: 'Salary Range (optional)',
            type: 'string',
        }),

        // Application deadline date/time
        defineField({
            name: 'deadline',
            title: 'Application Deadline',
            type: 'datetime',
        }),

        // Toggle: true = visible on /careers, false = hidden
        defineField({
            name: 'isActive',
            title: 'Active Listing',
            type: 'boolean',
            description: 'Toggle off to hide this job from the public careers page',
            initialValue: true,
        }),

        // Auto-populated when the document is first published
        defineField({
            name: 'postedAt',
            title: 'Posted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],

    // Studio preview shows title and department in the document list
    preview: {
        select: {
            title: 'title',
            subtitle: 'department',
        },
    },
});
