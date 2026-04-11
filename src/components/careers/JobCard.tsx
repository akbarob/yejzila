/**
 * src/components/careers/JobCard.tsx
 * Displays a single job listing as a card in the /careers grid.
 * Shows title, department badge, location, employment type, deadline, and a CTA link.
 * Accepts a `JobListing` prop from the GROQ query result.
 */

import Link from 'next/link';
import { MapPin, Clock, Briefcase, CalendarDays, ArrowRight } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface JobListing {
    _id: string;
    title: string;
    slug: { current: string };
    department: string;
    location: string;
    employmentType: string;
    salaryRange?: string;
    deadline?: string;
    postedAt?: string;
}

interface JobCardProps {
    job: JobListing;
}

// Maps department names to a colour class for the badge
const departmentColours: Record<string, string> = {
    'Oil & Gas': 'bg-amber-100 text-amber-800',
    Mining: 'bg-stone-100 text-stone-800',
    Energy: 'bg-blue-100 text-blue-800',
    Operations: 'bg-green-100 text-green-800',
    Finance: 'bg-purple-100 text-purple-800',
    Administration: 'bg-pink-100 text-pink-800',
    Technology: 'bg-cyan-100 text-cyan-800',
};

/** Formats an ISO date string into a human-readable short date (e.g. "15 Apr 2025"). */
function formatDate(iso?: string) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * JobCard — a card component for displaying a job listing summary.
 * Used in the /careers page grid. Links to /careers/[slug] for full details.
 */
export default function JobCard({ job }: JobCardProps) {
    const badgeClass =
        departmentColours[job.department] ?? 'bg-gray-100 text-gray-700';

    const deadline = formatDate(job.deadline);
    const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;

    return (
        // Card container — hover effect lifts the card
        <article className='group relative bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>

            {/* Department badge */}
            <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
                {job.department}
            </span>

            {/* Job title */}
            <h3 className='text-lg font-bold text-gray-900 group-hover:text-primary100 transition-colors line-clamp-2'>
                {job.title}
            </h3>

            {/* Meta info row */}
            <ul className='flex flex-col gap-2 text-sm text-gray-500'>
                {/* Location */}
                <li className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 shrink-0 text-gray-400' />
                    <span>{job.location}</span>
                </li>

                {/* Employment type */}
                <li className='flex items-center gap-2'>
                    <Briefcase className='w-4 h-4 shrink-0 text-gray-400' />
                    <span>{job.employmentType}</span>
                </li>

                {/* Salary range — only shown if provided */}
                {job.salaryRange && (
                    <li className='flex items-center gap-2'>
                        <Clock className='w-4 h-4 shrink-0 text-gray-400' />
                        <span>{job.salaryRange}</span>
                    </li>
                )}

                {/* Application deadline */}
                {deadline && (
                    <li className='flex items-center gap-2'>
                        <CalendarDays className='w-4 h-4 shrink-0 text-gray-400' />
                        <span className={isExpired ? 'text-red-500 font-medium' : ''}>
                            {isExpired ? 'Closed' : `Deadline: ${deadline}`}
                        </span>
                    </li>
                )}
            </ul>

            {/* CTA — full width link to the job detail page */}
            <Link
                href={`/careers/${job.slug.current}`}
                className='mt-auto inline-flex items-center justify-between bg-gray-50 group-hover:bg-primary100 group-hover:text-white text-gray-800 font-semibold text-sm px-4 py-3 rounded-xl transition-all duration-300'
            >
                <span>View & Apply</span>
                <ArrowRight className='w-4 h-4' />
            </Link>
        </article>
    );
}
