'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
export default function Aboutus() {
    const ref = useRef(null);
    const ref2 = useRef(null);

    const isInView = useInView(ref);
    const isInView2 = useInView(ref2);

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
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 1, // Delay of 1 second before starting stagger
                staggerChildren: 0.3, // Adjust the value to control the stagger timing
            },
        },
    };
    const leftVariants = {
        hidden: { x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 2,
            },
        },
    };
    const Grid = [
        {
            title: 'Our Vision',
            text: 'To be a trusted leader in industrial procurement and supply solutions, driving excellence and sustainable growth.',
        },
        {
            title: 'Our Mission',
            text: 'To deliver world-class, reliable, quality and cost-effective procurement solutions that meet industry needs and create lasting value.',
        },
        {
            title: 'Our Core Values — PACT',
            values: [
                {
                    letter: 'P',
                    name: 'Professionalism',
                    text: 'Upholding high standards in every engagement.',
                },
                {
                    letter: 'A',
                    name: 'Accountability',
                    text: 'Taking ownership and delivering on commitments.',
                },
                {
                    letter: 'C',
                    name: 'Customer Focus',
                    text: 'Prioritising client needs and creating value.',
                },
                {
                    letter: 'T',
                    name: 'Trust',
                    text: 'Building lasting relationships through integrity and reliability.',
                },
            ],
        },
    ];
    return (
        <div>
            {' '}
            <div className='h-full w-full bg-white flex flex-col p-10 lg:px-44 justify-center items-start gap-8 '>
                <motion.h2
                    ref={ref}
                    initial='hidden'
                    animate={isInView ? 'visible' : ''}
                    variants={titleVariants}
                    className='font-semibold text-4xl text-left text-navy100'>
                    About Us
                </motion.h2>

                <p className='w-full  text-lg text-slate-600'>
                    <span className='text-primary100 text-2xl'>
                        YEJZILA Resources Limited
                    </span>{' '}
                    is an industrial procurement and supply solutions company
                    serving the oil &amp; gas, energy and mining sectors. We
                    specialise in sourcing and supplying industrial materials,
                    equipment and operational essentials, supported by
                    efficient supply chain coordination and a client-focused
                    approach. Through reliable sourcing, strategic supplier
                    relationships and cost-effective solutions, we support our
                    clients’ operational needs, efficiency and business growth.
                </p>

                {/* Vision and Mission side by side */}
                <div className='grid w-full gap-6 md:grid-cols-2' ref={ref2}>
                    {Grid.filter((item) => item.text).map((item) => (
                        <div
                            key={item.title}
                            className='group flex flex-col gap-3 rounded-[6px] border-l-4 border-primary100 bg-primary100/10 p-8 shadow shadow-primary100/20 transition-colors duration-500 ease-in-out hover:bg-primary100'>
                            <p className='text-xl font-semibold text-navy100'>
                                {item.title}
                            </p>
                            <p className='text-left text-base leading-7 text-slate-600 transition-colors duration-500 group-hover:text-slate-900'>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Core values: one letter of PACT per column */}
                {Grid.filter((item) => item.values).map((item) => (
                    <div
                        key={item.title}
                        className='w-full rounded-[6px] bg-primary100/10 p-8 shadow shadow-primary100/20 lg:p-10'>
                        <div className='flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10'>
                            <p className='text-xl font-semibold text-navy100'>
                                Our Core Values —{' '}
                                <span className='text-primary100'>PACT</span>
                            </p>
                            <p className='max-w-[560px] text-base leading-7 text-slate-600 lg:text-right'>
                                Every partnership is a PACT built on
                                professionalism, accountability, customer focus
                                and trust.
                            </p>
                        </div>

                        <ul className='mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4'>
                            {item.values.map((value) => (
                                <li
                                    key={value.letter}
                                    className='border-t-2 border-primary100 pt-4'>
                                    <span
                                        aria-hidden='true'
                                        className='block text-6xl font-extrabold leading-none text-primary100'>
                                        {value.letter}
                                    </span>
                                    <p className='mt-3 text-lg font-semibold text-navy100'>
                                        {value.name}
                                    </p>
                                    <p className='mt-1 text-base leading-7 text-slate-600'>
                                        {value.text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        {/* Sign-off: tagline centred between two rules */}
                        <div className='mt-10 flex items-center gap-4 sm:gap-6'>
                            <span
                                aria-hidden='true'
                                className='hidden h-px flex-1 bg-primary100/40 sm:block'
                            />
                            <p className='w-full text-center text-lg font-semibold tracking-wide text-navy100 sm:w-auto sm:text-xl'>
                                YEJZILA
                                <span className='block whitespace-nowrap text-primary100'>
                                    Unlocking Brilliance.
                                </span>
                            </p>
                            <span
                                aria-hidden='true'
                                className='hidden h-px flex-1 bg-primary100/40 sm:block'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
