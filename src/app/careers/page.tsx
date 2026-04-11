/**
 * src/app/careers/page.tsx
 * Server component — fetches active job listings from Sanity and renders the /careers page.
 * Supports URL search param filtering by department, location, and employmentType.
 * Filtering is done server-side for fast, SEO-friendly pages.
 *
 * User Story:
 * As a job seeker, I want to browse and filter available positions at Yejzila,
 * so that I can find roles relevant to my skills and location.
 *
 * Acceptance criteria:
 * - Unit testing has been completed
 * - Regression testing has been completed
 */

import { Suspense } from 'react';
import { Briefcase } from 'lucide-react';
import { getActiveJobs, getFilterOptions } from '@/lib/sanity';
import JobCard, { JobListing } from '@/components/careers/JobCard';
import JobFilters from '@/components/careers/JobFilters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

// SEO metadata for the careers page
export const metadata = {
    title: 'Careers | Yejzila Resources Limited',
    description:
        'Explore exciting career opportunities at Yejzila Resources Limited in Oil & Gas, Mining, and Energy sectors across Nigeria and beyond.',
};

// Force dynamic rendering so filter changes are always reflected
export const dynamic = 'force-dynamic';

// ── Types ─────────────────────────────────────────────────────────────────────
interface CareersPageProps {
    searchParams: Promise<{
        department?: string;
        location?: string;
        type?: string;
    }>;
}

/**
 * CareersPage — the main /careers listing page.
 * Fetches jobs and filter options from Sanity, applies URL param filters, and renders the grid.
 */
export default async function CareersPage({ searchParams }: CareersPageProps) {
    const resolvedParams = await searchParams;
    // Fetch data in parallel for performance
    const [allJobs, filterOptions] = await Promise.all([
        getActiveJobs(),
        getFilterOptions(),
    ]);

    // Apply server-side filtering based on URL search params
    const filteredJobs: JobListing[] = allJobs.filter((job: JobListing) => {
        const matchesDept =
            !resolvedParams.department ||
            job.department === resolvedParams.department;
        const matchesLoc =
            !resolvedParams.location ||
            job.location === resolvedParams.location;
        const matchesType =
            !resolvedParams.type || job.employmentType === resolvedParams.type;
        return matchesDept && matchesLoc && matchesType;
    });

    return (
        <div>
            {/* Top navigation bar shared across the site */}
            <Navbar />

            <main className='min-h-screen bg-gray-50'>
                {/* ── Hero Section ───────────────────────────────────────────── */}
                <section className='relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary100 pt-32 pb-20 px-5 lg:px-28 xl:px-40'>
                    {/* Decorative background dot grid */}
                    <div
                        className='absolute inset-0 opacity-10 pointer-events-none'
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />

                    <div className='relative max-w-4xl'>
                        {/* Section label */}
                        <span className='inline-flex items-center gap-2 text-primary100 bg-white/10 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-6'>
                            <Briefcase className='w-4 h-4' />
                            Join Our Team
                        </span>

                        {/* Headline */}
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6'>
                            Build Your Career
                            <br />
                            <span className='text-primary100'>at Yejzila</span>
                        </h1>

                        <p className='text-gray-300 text-lg max-w-2xl'>
                            We're a premier diverse company specialising in Oil,
                            Gas, Energy, and Mining. Join a team committed to
                            excellence, sustainability, and innovation.
                        </p>

                        {/* Live job count badge */}
                        <div className='mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3'>
                            <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                            <span className='text-white font-semibold text-sm'>
                                {allJobs.length} open{' '}
                                {allJobs.length === 1
                                    ? 'position'
                                    : 'positions'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── Listings Section ───────────────────────────────────────── */}
                <section className='px-5 lg:px-28 xl:px-40 py-14'>
                    {/* Filter bar — wrapped in Suspense for searchParams compatibility */}
                    <Suspense fallback={null}>
                        <JobFilters options={filterOptions} />
                    </Suspense>

                    {/* Results summary */}
                    <div className='mt-8 mb-6 flex items-center justify-between'>
                        <p className='text-gray-500 text-sm'>
                            Showing{' '}
                            <span className='text-gray-900 font-semibold'>
                                {filteredJobs.length}
                            </span>{' '}
                            {filteredJobs.length === 1 ? 'role' : 'roles'}
                        </p>
                    </div>

                    {/* Job cards grid or empty state */}
                    {filteredJobs.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-24 text-center gap-4'>
                            <Briefcase className='w-12 h-12 text-gray-300' />
                            <h2 className='text-xl font-bold text-gray-700'>
                                No positions found
                            </h2>
                            <p className='text-gray-400 max-w-sm'>
                                There are no open roles matching your current
                                filters. Try adjusting or clearing them.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
