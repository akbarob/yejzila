/**
 * src/components/careers/JobFilters.tsx
 * Client component for filtering job listings on the /careers page.
 * Receives available filter options (departments, locations, types) from the server.
 * Updates URL search params on change so filters are shareable and bookmarkable.
 */

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Filter, X } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FilterOptions {
    departments: string[];
    locations: string[];
    employmentTypes: string[];
}

interface JobFiltersProps {
    options: FilterOptions;
}

/**
 * JobFilters — renders three filter dropdowns (department, location, employment type).
 * Operates via URL search params so filters persist on page reload and are sharable.
 * A "Clear Filters" button resets all params at once.
 */
export default function JobFilters({ options }: JobFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read current filter values from URL
    const currentDept = searchParams.get('department') ?? '';
    const currentLoc = searchParams.get('location') ?? '';
    const currentType = searchParams.get('type') ?? '';

    // Determines whether any filter is currently active
    const hasFilters = currentDept || currentLoc || currentType;

    /** Updates a single URL search param while preserving others. */
    const updateFilter = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );

    /** Clears all active filters by resetting the URL to the base pathname. */
    const clearFilters = () => {
        router.push(pathname, { scroll: false });
    };

    return (
        // Filter bar container
        <div className='flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm'>

            {/* Filter icon label */}
            <div className='flex items-center gap-2 text-gray-500 text-sm font-medium pr-2 border-r border-gray-200'>
                <Filter className='w-4 h-4' />
                <span>Filter</span>
            </div>

            {/* Department dropdown */}
            <select
                id='filter-department'
                value={currentDept}
                onChange={(e) => updateFilter('department', e.target.value)}
                className='flex-1 min-w-[160px] text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary100 cursor-pointer'
                aria-label='Filter by department'
            >
                <option value=''>All Departments</option>
                {options.departments.map((dept) => (
                    <option key={dept} value={dept}>
                        {dept}
                    </option>
                ))}
            </select>

            {/* Location dropdown */}
            <select
                id='filter-location'
                value={currentLoc}
                onChange={(e) => updateFilter('location', e.target.value)}
                className='flex-1 min-w-[160px] text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary100 cursor-pointer'
                aria-label='Filter by location'
            >
                <option value=''>All Locations</option>
                {options.locations.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>

            {/* Employment type dropdown */}
            <select
                id='filter-type'
                value={currentType}
                onChange={(e) => updateFilter('type', e.target.value)}
                className='flex-1 min-w-[160px] text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary100 cursor-pointer'
                aria-label='Filter by employment type'
            >
                <option value=''>All Types</option>
                {options.employmentTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Clear filters button — only visible when a filter is active */}
            {hasFilters && (
                <button
                    onClick={clearFilters}
                    className='flex items-center gap-1 text-sm text-red-500 font-medium hover:text-red-700 transition-colors px-2 py-2'
                    aria-label='Clear all filters'
                >
                    <X className='w-4 h-4' />
                    <span>Clear</span>
                </button>
            )}
        </div>
    );
}
