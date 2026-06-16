/**
 * sanity/schemas/eventRegistration.ts
 * Schema for event registrations submitted through the-beloved-love /register page.
 * Stores all participant data plus their unique access code for event entry.
 */

import { defineType, defineField } from 'sanity';

export const eventRegistration = defineType({
    name: 'eventRegistration',
    title: 'Event Registration',
    type: 'document',
    fields: [
        // ── SECTION A: Personal Information ──────────────────────────────

        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'gender',
            title: 'Gender',
            type: 'string',
            options: {
                list: [
                    { title: 'Male', value: 'Male' },
                    { title: 'Female', value: 'Female' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'ageRange',
            title: 'Age Range',
            type: 'string',
            options: {
                list: [
                    { title: 'Below 18', value: 'Below 18' },
                    { title: '18–24', value: '18–24' },
                    { title: '25–34', value: '25–34' },
                    { title: '35–44', value: '35–44' },
                    { title: '45–54', value: '45–54' },
                    { title: '55 and above', value: '55 and above' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'phone',
            title: 'Phone Number (WhatsApp)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) =>
                Rule.required().email().error('Must be a valid email address'),
        }),

        defineField({
            name: 'address',
            title: 'Residential Address / City',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'occupation',
            title: 'Occupation',
            type: 'string',
        }),

        defineField({
            name: 'church',
            title: 'Church / Ministry / Organization',
            type: 'string',
        }),

        defineField({
            name: 'churchPosition',
            title: 'Position in Church / Ministry / Organization',
            type: 'string',
        }),

        // ── SECTION C: Event Communication ───────────────────────────────

        defineField({
            name: 'updatePreference',
            title: 'Preferred Update Channel',
            type: 'string',
            description: 'How the participant wants to receive event updates',
        }),

        defineField({
            name: 'countdownReminders',
            title: 'Daily Countdown Reminders',
            type: 'string',
            options: {
                list: [
                    { title: 'Yes', value: 'Yes' },
                    { title: 'No', value: 'No' },
                ],
                layout: 'radio',
            },
        }),

        defineField({
            name: 'whatsappCommunity',
            title: 'Join WhatsApp Community',
            type: 'string',
            options: {
                list: [
                    { title: 'Yes', value: 'Yes' },
                    { title: 'No', value: 'No' },
                ],
                layout: 'radio',
            },
        }),

        // ── SECTION D: Media & Consent ────────────────────────────────────

        defineField({
            name: 'photoConsent',
            title: 'Photo / Video Consent',
            type: 'string',
            options: {
                list: [
                    { title: 'Yes', value: 'Yes' },
                    { title: 'No', value: 'No' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),

        // ── Access & Status ───────────────────────────────────────────────

        defineField({
            name: 'accessCode',
            title: 'Access Code',
            type: 'string',
            description: 'Unique entry code — scan QR or enter manually at the event.',
            validation: (Rule) => Rule.required(),
            readOnly: true,
        }),

        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: '🆕 Registered', value: 'registered' },
                    { title: '✅ Checked In', value: 'checked_in' },
                    { title: '❌ Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
            initialValue: 'registered',
        }),

        defineField({
            name: 'registeredAt',
            title: 'Registered At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
    ],

    // Studio preview: name + code + status
    preview: {
        select: {
            fullName: 'fullName',
            accessCode: 'accessCode',
            status: 'status',
        },
        prepare({ fullName, accessCode, status }) {
            const statusIcon =
                status === 'checked_in' ? '✅' : status === 'cancelled' ? '❌' : '🆕';
            return {
                title: fullName,
                subtitle: `${statusIcon} ${accessCode ?? ''}`,
            };
        },
    },
});
