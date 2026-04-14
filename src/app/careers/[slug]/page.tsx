/**
 * src/app/careers/[slug]/page.tsx
 * Server component — fetches a single job listing by slug and renders full job details
 * plus the embedded ApplicationForm with CV upload.
 * Returns a 404 if the job is not found or is inactive.
 *
 * User Story:
 * As a job applicant, I want to read the full job description and apply directly on the page,
 * so that I can submit my application without navigating away.
 *
 * Acceptance criteria:
 * - Unit testing has been completed
 * - Regression testing has been completed
 */

import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import {
    CaretLeft,
    CaretRight,
    MapPin,
    Briefcase,
    Buildings,
    Timer,
    CalendarBlank,
    CheckCircle,
    ArrowRight,Money
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { getJobBySlug } from '@/lib/sanity';
import ApplicationForm from '@/components/careers/ApplicationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


// ── Types and Helper Functions ────────────────────────────────────────────────
interface SanityJob {
    _id: string;
    title: string;
    slug: { current: string };
    department: string;
    location: string;
    employmentType: string;
    salaryRange?: string;
    description?: any;
    responsibilities?: string[];
    requirements?: string[];
    deadline?: string;
    postedAt?: string;
    isActive: boolean;
}

function formatDate(dateStr?: string) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

// ── Dynamic metadata for SEO ──────────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) return { title: 'Job Not Found | Yejzila Careers' };

    return {
        title: `${job.title} | ${job.department} | Yejzila Careers`,
        description: `Apply for the ${job.title} position at Yejzila. ${job.location}, ${job.employmentType}.`,
    };
}

// ── Page Component ────────────────────────────────────────────────────────────
export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // Fetch the job from Sanity — returns null if not found or inactive
    const job = await getJobBySlug(slug);

    if (!job) {
        return notFound();
    }

    const deadline = formatDate(job.deadline);
    const postedAt = formatDate(job.postedAt);
    const isExpired = job.deadline
        ? new Date(job.deadline) < new Date()
        : false;

    return (
        <>
            <Navbar />

            <main className='min-h-screen bg-white'>
                {/* ── Hero / Header ──────────────────────────────────────────── */}
                <section className='relative bg-[#0B0F1A] pt-32 pb-20 px-5 lg:px-20  overflow-hidden'>
                    {/* Background Decorative Element */}
                    <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary100/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none' />
                    <div className='absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -ml-24 -mb-24 pointer-events-none' />

                    <div className='relative z-10'>
                        {/* Breadcrumb */}
                        <nav
                            aria-label='breadcrumb'
                            className='flex items-center gap-2 text-sm text-gray-500 mb-10'>
                            <Link
                                href='/careers'
                                className='flex items-center gap-1.5 hover:text-white transition-colors group'>
                                <CaretLeft size={16} />
                                <span>Back to Careers</span>
                            </Link>
                        </nav>

                        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8'>
                            <div className='flex-1 max-w-3xl'>
                                {/* Department pill */}
                                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary100/10  text-primary100 text-[11px] font-bold   tracking-wider mb-6'>
                                    <Buildings size={14} weight='bold' />
                                    {job.department}
                                </div>

                                {/* Job title */}
                                <h1 className='text-2xl md:text-2xl  font-black text-white leading-[1.1] mb-6 tracking-tight'>
                                    {job.title}
                                </h1>

                                {/* Meta chips */}
                                <div className='flex flex-wrap gap-4'>
                                    {/* Location */}
                                    <div className='flex items-center gap-2 text-sm text-gray-400 bg-white/5  px-4 py-2 rounded-xl backdrop-blur-sm'>
                                        <MapPin
                                            size={18}
                                            weight='duotone'
                                            className='text-primary100'
                                        />
                                        <span>{job.location}</span>
                                    </div>

                                    {/* Employment type */}
                                    <div className='flex items-center gap-2 text-sm text-gray-400 bg-white/5  px-4 py-2 rounded-xl backdrop-blur-sm'>
                                        <Briefcase
                                            size={18}
                                            weight='duotone'
                                            className='text-primary100'
                                        />
                                        <span>{job.employmentType}</span>
                                    </div>

                                    {/* Salary range — only if provided */}
                                    {job.salaryRange && (
                                        <div className='flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm'>
                                            <Money
                                                weight='duotone'
                                                size={18}
                                                className='text-primary100'
                                            />
                                            <span>{job.salaryRange}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Deadline display for Hero */}
                            {deadline && (
                                <div
                                    className={`hidden lg:flex flex-col items-center justify-center p-6 rounded-3xl border backdrop-blur-md min-w-[200px] ${
                                        isExpired
                                            ? 'bg-red-500/10 border-red-500/20'
                                            : 'bg-white/5 border-white/10'
                                    }`}>
                                    <CalendarBlank
                                        size={32}
                                        className={
                                            isExpired
                                                ? 'text-red-400'
                                                : 'text-primary100'
                                        }
                                        weight='duotone'
                                    />
                                    <div className='mt-3 text-center'>
                                        <p className='text-[10px] font-bold   tracking-widest text-gray-500 mb-1'>
                                            {isExpired ? 'Status' : 'Deadline'}
                                        </p>
                                        <p
                                            className={`text-base font-bold ${
                                                isExpired
                                                    ? 'text-red-300'
                                                    : 'text-white'
                                            }`}>
                                            {isExpired
                                                ? 'Closed'
                                                : `Apply by ${deadline}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className='px-5 md:px-20  py-14 '>
                    <div className='grid grid-cols-1 md:grid-cols-3  gap-12 mx-auto items-start'>
                        {/* ── Left Column: Job details ──────────────────────── */}
                        <div className='md:col-span-2 flex flex-col gap-12'>
                            {/* Job description — rich text from Sanity portable text */}
                            {job.description && (
                                <div>
                                    <h2 className='text-xl font-bold text-gray-900 mb-4'>
                                        About This Role
                                    </h2>
                                    <div className='prose prose-gray max-w-none text-gray-600 leading-relaxed'>
                                        <PortableText value={job.description} />
                                    </div>
                                </div>
                            )}

                            {/* Responsibilities list */}
                            {job.responsibilities &&
                                job.responsibilities.length > 0 && (
                                    <div className='p-8 rounded-[32px] bg-gray-50/50 border border-gray-100'>
                                        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
                                            <CheckCircle
                                                size={28}
                                                className='text-primary100'
                                                weight='duotone'
                                            />
                                            Responsibilities
                                        </h2>
                                        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            {job.responsibilities.map(
                                                (
                                                    item: string,
                                                    index: number,
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:border-primary100/30 hover:shadow-md group'>
                                                        <div className='mt-1 w-6 h-6 rounded-full bg-primary100/10 text-primary100 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-primary100 group-hover:text-white transition-colors'>
                                                            <ArrowRight
                                                                size={12}
                                                                weight='bold'
                                                            />
                                                        </div>
                                                        <span className='text-gray-700 font-medium leading-snug'>
                                                            {item}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}

                            {/* Requirements list */}
                            {job.requirements &&
                                job.requirements.length > 0 && (
                                    <div className='p-8 rounded-[32px] bg-gray-50/50 border border-gray-100'>
                                        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
                                            <Briefcase
                                                size={28}
                                                className='text-primary100'
                                                weight='duotone'
                                            />
                                            Requirements
                                        </h2>
                                        <ul className='flex flex-col gap-4'>
                                            {job.requirements.map(
                                                (
                                                    item: string,
                                                    index: number,
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:border-primary100/30 hover:shadow-md'>
                                                        <div className='mt-1 w-6 h-6 flex items-center justify-center text-primary100 shrink-0'>
                                                            <CheckCircle
                                                                size={24}
                                                                weight='fill'
                                                            />
                                                        </div>
                                                        <span className='text-gray-700 font-medium leading-relaxed'>
                                                            {item}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                        </div>

                        {/* ── Right Column: Sticky application form ─────────── */}
                        <div className='md:col-span-1 w-full'>
                            <div className='sticky top-28'>
                                <div className='mb-6 p-2'>
                                    <h2 className='text-2xl font-black text-gray-900 mb-2 leading-tight   tracking-tighter'>
                                        Apply Now
                                    </h2>
                                    <p className='text-sm text-gray-500 font-medium'>
                                        Fill all required fields and attach your
                                        CV to submit your application.
                                    </p>
                                </div>

                                {/* Application form — disabled if deadline has passed */}
                                {isExpired ? (
                                    <div className='text-center py-12 px-6 bg-red-50 border border-red-100 rounded-[32px]'>
                                        <CalendarBlank
                                            size={48}
                                            className='mx-auto mb-4 text-red-200'
                                            weight='duotone'
                                        />
                                        <p className='text-lg font-bold text-red-900'>
                                            Applications Closed
                                        </p>
                                        <p className='text-sm text-red-600/70 mt-2 font-medium leading-relaxed'>
                                            The deadline for this position has
                                            passed. We are no longer accepting
                                            new applications.
                                        </p>
                                    </div>
                                ) : (
                                    <ApplicationForm
                                        jobId={job._id}
                                        jobTitle={job.title}
                                        applicationType='job'
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
