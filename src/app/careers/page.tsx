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
import { Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { 
    getActiveJobs, 
    getFilterOptions, 
    getPipelineCategories 
} from '@/lib/sanity';
import JobCard, { JobListing } from '@/components/careers/JobCard';
import JobFilters from '@/components/careers/JobFilters';
import TalentPipeline from '@/components/careers/TalentPipeline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    const [allJobs, filterOptions, pipelineCategories] = await Promise.all([
        getActiveJobs(),
        getFilterOptions(),
        getPipelineCategories(),
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

            <main className='min-h-screen bg-white'>
                {/* ── Hero Section ───────────────────────────────────────────── */}
                <section className='relative bg-[#0B0F1A] pt-40 pb-24 px-5 lg:px-28 xl:px-40 overflow-hidden'>
                    {/* Background Decorative Element */}
                    <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary100/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none' />
                    
                    <div className='relative max-w-4xl'>
                        {/* Section label */}
                        <span className='inline-flex items-center gap-2 text-primary100 bg-primary100/10 border border-primary100/20 text-[10px] font-semibold tracking-widest  px-4 py-1.5 rounded-full mb-6'>
                            <Briefcase className='w-4 h-4' />
                            Join Our Team
                        </span>

                        {/* Headline */}
                        <h1 className='text-2xl  font-black text-white leading-[1.05] mb-4 tracking-tight'>
                            Build Your Career  
                            <span className='text-primary100'> at Yejzila</span>
                        </h1>

                        <p className='text-gray-400 text-base font-normal max-w-2xl leading-relaxed'>
                            We're a premier diverse company specialising in Oil,
                            Gas, Energy, and Mining. Join a team committed to
                            excellence, sustainability, and innovation.
                        </p>

                        {/* Live job count badge & Pipeline Link */}
                        <div className='mt-10 flex flex-wrap gap-4 items-center'>
                            <div className='inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3'>
                                <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                                <span className='text-white font-semibold text-sm'>
                                    {allJobs.length} open{' '}
                                    {allJobs.length === 1
                                        ? 'position'
                                        : 'positions'}
                                </span>
                            </div>

                            <a 
                                href='#talent-pipeline'
                                className='inline-flex items-center gap-2 bg-primary100 hover:bg-primary100/90 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-primary100/25 active:scale-95'
                            >
                                <span>Join Talent Pipeline</span>
                                <ArrowRight className='w-4 h-4' />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Listings Section ───────────────────────────────────────── */}
                <section className='px-5 lg:px-28 xl:px-40 py-20'>
                    {/* Filter bar — wrapped in Suspense for searchParams compatibility */}
                    <Suspense fallback={null}>
                        <JobFilters options={filterOptions} />
                    </Suspense>

                    {/* Results summary */}
                    <div className='mt-12 mb-8 flex items-center justify-between'>
                        <p className='text-gray-500 font-medium'>
                            Found{' '}
                            <span className='text-gray-900 font-bold'>
                                {filteredJobs.length}
                            </span>{' '}
                            {filteredJobs.length === 1 ? 'open position' : 'open positions'}
                        </p>
                    </div>

                    {/* Job cards grid or empty state */}
                    {filteredJobs.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-24 text-center gap-4 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100'>
                            <Briefcase className='w-12 h-12 text-gray-200' />
                            <h2 className='text-xl font-bold text-gray-700'>
                                No current openings
                            </h2>
                            <p className='text-gray-400 max-w-sm font-medium'>
                                We don't have any roles matching those filters right now. 
                                Try clearing them or apply to our talent pipeline below.
                            </p>
                        </div>
                    )}

                    {/* ── Talent Pipeline Section ── */}
                    <div id="talent-pipeline">
                        <TalentPipeline categories={pipelineCategories} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
