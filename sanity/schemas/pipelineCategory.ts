/**
 * sanity/schemas/pipelineCategory.ts
 * Schema for dynamic categories in the Talent Pipeline (e.g., HR, Customer Service).
 * Users can apply to these general categories when no specific job is open.
 */

import { defineType, defineField } from 'sanity';

export const pipelineCategory = defineType({
    name: 'pipelineCategory',
    title: 'Pipeline Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Category Title',
            type: 'string',
            description: 'Name of the talent category (e.g., "Human Resources", "Customer Service")',
            validation: (Rule) => Rule.required(),
        }),
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
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description of what roles fall under this category.',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle on to make this category available for applications.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
});
