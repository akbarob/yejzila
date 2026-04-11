/**
 * sanity/schemas/jobApplication.ts
 * Schema for job applications submitted through the public /careers/[slug] form.
 * CV files are stored in Sanity's asset pipeline and downloadable from the Studio.
 * The `status` field allows the client to track candidates through the hiring pipeline.
 */

import { defineType, defineField } from 'sanity';

export const jobApplication = defineType({
    name: 'jobApplication',
    title: 'Job Application',
    type: 'document',
    fields: [
        // Applicant's full name
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        // Applicant's email address
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) =>
                Rule.required().email().error('Must be a valid email address'),
        }),

        // Applicant's phone number
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),

        // Cover letter text — plain text block
        defineField({
            name: 'coverLetter',
            title: 'Cover Letter',
            type: 'text',
            rows: 6,
        }),

        // CV/Resume file — stored in Sanity asset pipeline, downloadable from Studio
        defineField({
            name: 'resume',
            title: 'CV / Resume',
            type: 'file',
            options: {
                accept: '.pdf,.doc,.docx',
            },
        }),

        // Optional LinkedIn profile URL
        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn Profile URL (optional)',
            type: 'url',
        }),

        // Reference to the job listing this application belongs to
        defineField({
            name: 'jobListing',
            title: 'Job Listing',
            type: 'reference',
            to: [{ type: 'jobListing' }],
            validation: (Rule) => Rule.required(),
        }),

        // Application status — updated by the client in Studio to track candidates
        defineField({
            name: 'status',
            title: 'Application Status',
            type: 'string',
            options: {
                list: [
                    { title: '🆕 New', value: 'new' },
                    { title: '👀 Reviewing', value: 'reviewing' },
                    { title: '✅ Shortlisted', value: 'shortlisted' },
                    { title: '❌ Rejected', value: 'rejected' },
                ],
                layout: 'radio',
            },
            initialValue: 'new',
        }),

        // Timestamp when the application was submitted
        defineField({
            name: 'appliedAt',
            title: 'Applied At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],

    // Studio preview shows applicant name and which job they applied for
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'jobListing.title',
        },
    },
});
