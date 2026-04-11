/**
 * src/components/careers/TalentPipeline.tsx
 * Client component that allows users to select a talent category and submit their application.
 * Rendered at the bottom of the main /careers page.
 *
 * Acceptance criteria: Unit testing has been completed and Regression testing has been completed
 */

'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
    Users,
    RocketLaunch,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    MapPin,
    CalendarBlank,
    MagnifyingGlass,
} from '@phosphor-icons/react';
import ApplicationForm from './ApplicationForm';

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
}

interface TalentPipelineProps {
    categories: Category[];
}

const ITEMS_PER_PAGE = 9;

export default function TalentPipeline({ categories }: TalentPipelineProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        categories.length > 0 ? categories[0]._id : null,
    );
    const formRef = useRef<HTMLDivElement>(null);

    // ── Filter Logic ─────────────────────────────────────────────────────────
    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [categories, searchQuery]);

    // ── Pagination Logic ─────────────────────────────────────────────────────
    const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const selectedCategory = categories.find(
        (c) => c._id === selectedCategoryId,
    );

    const handleSelect = (id: string) => {
        setSelectedCategoryId(id);
        if (window.innerWidth < 1024 && formRef.current) {
            formRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    if (categories.length === 0) return null;

    return (
        <section className='mt-24 pt-24 border-t border-gray-100'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16'>
                <div className='flex-1'>
                    <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary100/10 text-primary100 text-[11px] font-bold tracking-widest uppercase mb-4'>
                        <RocketLaunch size={16} weight='bold' />
                        Always Open
                    </span>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight'>
                        Join our Talent Pipeline
                    </h2>
                    <p className='text-gray-500 font-medium text-lg leading-relaxed max-w-xl'>
                        Select a category below to submit your profile for
                        future roles.
                    </p>
                </div>

                {/* ── Search Bar ──────────────────────────────────────────────── */}
                <div className='relative w-full md:max-w-xs transition-all focus-within:max-w-sm'>
                    <MagnifyingGlass
                        size={20}
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors group-focus-within:text-primary100'
                    />
                    <input
                        type='text'
                        placeholder='Search categories...'
                        value={searchQuery}
                        onChange={handleSearch}
                        className='w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary100 focus:bg-white outline-none rounded-2xl text-sm font-semibold transition-all shadow-sm'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
                {/* ── Left: Category Cards Grid with Pagination ────────── */}
                <div className='lg:col-span-7 flex flex-col gap-10'>
                    {paginatedCategories.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                            {paginatedCategories.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => handleSelect(category._id)}
                                    className={`group  relative flex flex-col gap-4 p-6 rounded-[32px] border-2 text-left transition-all duration-300 ${
                                        selectedCategoryId === category._id
                                            ? 'bg-white border-primary100 shadow-xl shadow-primary100/10 -translate-y-1'
                                            : 'bg-gray-50/50 border hover:bg-white hover:border-gray-200 hover:shadow-lg hover:-translate-y-1'
                                    }`}>
                                    <div className='flex justify-between items-start'>
                                        <span
                                            className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                                                selectedCategoryId ===
                                                category._id
                                                    ? 'bg-primary100 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            Pipeline
                                        </span>
                                        {selectedCategoryId ===
                                            category._id && (
                                            <CheckCircle
                                                size={24}
                                                weight='fill'
                                                className='text-primary100'
                                            />
                                        )}
                                    </div>

                                    <h3
                                        className={`text-lg font-semibold tracking-tight leading-tight transition-colors ${
                                            selectedCategoryId === category._id
                                                ? 'text-gray-900'
                                                : 'text-gray-700'
                                        }`}>
                                        {category.title}
                                    </h3>

                                    <ul className='flex flex-col gap-2 text-[11px] font-normal text-gray-400'>
                                        <li className='flex items-center gap-2'>
                                            <CalendarBlank
                                                size={14}
                                                className={
                                                    selectedCategoryId ===
                                                    category._id
                                                        ? 'text-primary100'
                                                        : ''
                                                }
                                            />
                                            <span>{category.description}</span>
                                        </li>
                                        {/* <li className='flex items-center gap-2'>
                                            <MapPin
                                                size={14}
                                                className={
                                                    selectedCategoryId ===
                                                    category._id
                                                        ? 'text-primary100'
                                                        : ''
                                                }
                                            />
                                            <span>Remote / Hybrid</span>
                                        </li> */}
                                        {/* <li className='flex items-center gap-2'>
                                            <CalendarBlank
                                                size={14}
                                                className={
                                                    selectedCategoryId ===
                                                    category._id
                                                        ? 'text-primary100'
                                                        : ''
                                                }
                                            />
                                            <span>Always Open</span>
                                        </li> */}
                                    </ul>

                                    <div
                                        className={`mt-2 inline-flex items-center justify-between w-full p-3.5 rounded-xl text-[11px] font-black transition-all ${
                                            selectedCategoryId === category._id
                                                ? 'bg-primary100 text-white'
                                                : 'bg-white text-gray-900 border border-gray-100 group-hover:bg-primary100 group-hover:text-white'
                                        }`}>
                                        <span>
                                            {selectedCategoryId === category._id
                                                ? 'Selected'
                                                : 'Select'}
                                        </span>
                                        <ArrowRight size={14} weight='bold' />
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200'>
                            <MagnifyingGlass
                                size={48}
                                className='mx-auto text-gray-200 mb-4'
                            />
                            <p className='text-gray-400 font-bold'>
                                No categories match your search.
                            </p>
                        </div>
                    )}

                    {/* ── Pagination Controls ────────────────────────────────── */}
                    {totalPages > 1 && (
                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                                disabled={currentPage === 1}
                                className='p-3 rounded-full border-2 border-gray-100 hover:border-primary100 hover:text-primary100 disabled:opacity-30 disabled:pointer-events-none transition-all'>
                                <ArrowLeft size={20} weight='bold' />
                            </button>

                            <div className='flex items-center gap-2'>
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                            currentPage === page
                                                ? 'bg-primary100 text-white shadow-lg shadow-primary100/20'
                                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                        }`}>
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(totalPages, prev + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className='p-3 rounded-full border-2 border-gray-100 hover:border-primary100 hover:text-primary100 disabled:opacity-30 disabled:pointer-events-none transition-all'>
                                <ArrowRight size={20} weight='bold' />
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Right: Application Form (Sticky) ─────────────────── */}
                <div ref={formRef} className='lg:col-span-12 xl:col-span-5'>
                    <div className='sticky top-24 bg-white rounded-[40px] p-8 md:p-10 border-2 border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]'>
                        <div className='mb-10 text-center'>
                            <h3 className='text-2xl font-black text-gray-900 mb-2 tracking-tight'>
                                Apply for{' '}
                                {selectedCategory?.title || 'Pipeline'}
                            </h3>
                            <p className='text-sm text-gray-500 font-medium'>
                                Join our talent community
                            </p>
                        </div>

                        {selectedCategory ? (
                            <ApplicationForm
                                applicationType='pipeline'
                                categoryId={selectedCategory._id}
                                categoryTitle={selectedCategory.title}
                            />
                        ) : (
                            <div className='text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200'>
                                <Users
                                    size={48}
                                    className='mx-auto text-gray-200 mb-4'
                                />
                                <p className='text-gray-400 font-bold'>
                                    Select a category to apply
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
