/**
 * src/app/api/applications/route.ts
 * POST /api/applications — server-side handler for job application form submissions.
 * Reads multipart form data, uploads the CV to Sanity's asset pipeline,
 * then creates a jobApplication document referencing the uploaded asset and job listing.
 *
 * The Sanity WRITE TOKEN is only used here (server-side) and is never exposed to the browser.
 *
 * User Story:
 * As a job applicant, I want my application and CV to be securely stored,
 * so that the Yejzila team can review my profile in their admin panel.
 *
 * Acceptance criteria:
 * - Unit testing has been completed
 * - Regression testing has been completed
 */

import { createClient } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

// ── Sanity write client — server-side only ────────────────────────────────────
// Uses the write token from .env.local — never imported in client components

export const dynamic = 'force-dynamic'; // Prevent static evaluation at build time

const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '00000000',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN, // Write token — keep this secret
    useCdn: false, // Disable CDN cache for mutations
});

/**
 * POST /api/applications
 * Handles multipart form data from ApplicationForm.tsx.
 * Steps:
 * 1. Parse FormData fields and the CV file.
 * 2. Upload CV to Sanity asset pipeline → get asset reference.
 * 3. Create a jobApplication Sanity document with all fields + asset ref.
 */
export async function POST(request: NextRequest) {
    try {
        // Parse incoming multipart form data
        const formData = await request.formData();

        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string | null;
        const coverLetter = formData.get('coverLetter') as string | null;
        const linkedinUrl = formData.get('linkedinUrl') as string | null;
        const jobId = formData.get('jobId') as string;
        const resumeFile = formData.get('resume') as File | null;

        // Validate required fields before touching Sanity
        if (!fullName?.trim() || !email?.trim() || !jobId?.trim()) {
            return NextResponse.json(
                { message: 'Full name, email, and job ID are required.' },
                { status: 400 }
            );
        }

        // ── CV Upload ──────────────────────────────────────────────────────
        let resumeAssetRef: { _type: string; asset: { _type: string; _ref: string } } | undefined;

        if (resumeFile && resumeFile.size > 0) {
            // Convert the File object to a Buffer for Sanity's upload API
            const arrayBuffer = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload the CV to Sanity's asset pipeline — returns an asset document
            const uploadedAsset = await writeClient.assets.upload('file', buffer, {
                filename: resumeFile.name,
                contentType: resumeFile.type,
            });

            // Build the Sanity file reference object
            resumeAssetRef = {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: uploadedAsset._id,
                },
            };
        }

        // ── Create jobApplication document ─────────────────────────────────
        const applicationDoc = {
            _type: 'jobApplication',
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || undefined,
            coverLetter: coverLetter?.trim() || undefined,
            linkedinUrl: linkedinUrl?.trim() || undefined,
            resume: resumeAssetRef,
            jobListing: {
                _type: 'reference',
                _ref: jobId,
            },
            status: 'new', // Default status — client updates this in Studio
            appliedAt: new Date().toISOString(),
        };

        // Save the document to Sanity
        await writeClient.create(applicationDoc);

        return NextResponse.json(
            { message: 'Application submitted successfully.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('[POST /api/applications] Error:', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
