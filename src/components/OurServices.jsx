'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { serviceGroups } from '@/lib/services';

export default function OurServices() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const titleVariants = {
        hidden: {
            opacity: 0,
            x: -100, // Start off-screen to the left
        },
        visible: {
            opacity: 1,
            x: 0, // Move to original position
            transition: {
                duration: 0.5, // Duration of the transition
            },
        },
    };

    return (
        <div className='h-full w-full bg-primary100 flex flex-col p-10 lg:px-44 justify-center items-start gap-8'>
            <motion.h2
                ref={ref}
                initial='hidden'
                animate={isInView ? 'visible' : ''}
                variants={titleVariants}
                className='font-semibold text-4xl text-left text-navy900'>
                Procurement &amp; Supply Capabilities
            </motion.h2>

            <p className='w-full max-w-[800px] text-lg text-slate-700'>
                Six areas of procurement and supply support, from technical
                and industrial materials to facilities, events, supply chain
                and manpower services.
            </p>

            <div className='flex w-full flex-col gap-6'>
                {serviceGroups.map((group) => (
                    <section
                        key={group.slug}
                        id={group.slug}
                        aria-labelledby={`${group.slug}-title`}
                        className='scroll-mt-24 rounded-[6px] bg-white p-6 lg:p-8'>
                        <div className='grid gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:items-start'>
                            <div>
                                <h3
                                    id={`${group.slug}-title`}
                                    className='border-l-4 border-primary100 pl-4 text-2xl font-semibold leading-snug text-navy100'>
                                    {group.title}
                                </h3>
                                <ul className='mt-6 flex flex-col gap-3'>
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className='flex items-start gap-3 text-base leading-6 text-slate-600'>
                                            <Check
                                                size={18}
                                                strokeWidth={2.5}
                                                aria-hidden='true'
                                                className='mt-[3px] shrink-0 text-primary100'
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <ul
                                className={`grid gap-4 ${
                                    group.images.length === 2
                                        ? 'grid-cols-1 sm:grid-cols-2'
                                        : group.images.length > 3
                                          ? 'grid-cols-2 sm:grid-cols-3'
                                          : 'grid-cols-1 sm:grid-cols-3'
                                }`}>
                                {group.images.map((image) => (
                                    <li key={image.src}>
                                        <figure>
                                            <div className={`relative aspect-[4/3] overflow-hidden rounded-[6px] bg-slate-100 ${
                                                    group.images.length === 3
                                                        ? 'sm:aspect-[3/4]'
                                                        : ''
                                                }`}>
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    fill
                                                    sizes='(max-width: 640px) 100vw, (max-width: 1280px) 30vw, 240px'
                                                    className='object-cover'
                                                />
                                            </div>
                                            <figcaption className='mt-2 text-sm font-medium leading-5 text-slate-700'>
                                                {image.caption}
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
