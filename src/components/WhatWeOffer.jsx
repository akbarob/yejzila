'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function WhatWeOffer() {
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
        <div className='w-full flex flex-col px-10 lg:px-44 py-20 justify-center items-start gap-6'>
            <motion.h3
                ref={ref}
                initial='hidden'
                animate={isInView ? 'visible' : ''}
                variants={titleVariants}
                className='font-semibold text-4xl text-left'>
                What we offer
            </motion.h3>
            <p className='w-full  text-slate-600 mb-14 text-lg'>
                <span className='text-primary100 text-2xl'>YEJZILA </span>
                Support Services in conjunction with Flenco Engineers Fluid
                System&apos;s production ranges offer a diverse array of
                comprehensive engineering solutions that redefine industry
                standards.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {offerings.map((offering, index) => (
                    <motion.div
                        key={index}
                        className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <div className='flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto'>
                            <Image
                                width={100}
                                height={100}
                                src={offering.image}
                                alt={offering.title}
                                className='w-12 h-12 object-contain'
                            />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-3 text-center'>
                            {offering.title}
                        </h3>
                        {/* <p className='text-gray-600 text-center leading-relaxed'>
                            {offering.description}
                        </p> */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
const offerings = [
    {
        title: 'Professional Engineers',
        description:
            'Highly skilled engineers with extensive experience in various industries and technical domains.',
        image: '/assets/professional-engineers.svg',
    },
    {
        title: 'Construction',
        description:
            'Comprehensive construction services from planning to execution with quality assurance.',
        image: '/assets/construction.svg',
    },
    {
        title: 'Oil & Gas',
        description:
            'Specialized services for the oil and gas industry including exploration and production support.',
        image: '/assets/oil-gas-offering.svg',
    },
    {
        title: 'Building',
        description:
            'Complete building solutions from design to construction with modern architectural approaches.',
        image: '/assets/building.svg',
    },
    {
        title: '24/7 Support',
        description:
            'Round-the-clock support services ensuring continuous operations and immediate assistance.',
        image: '/assets/support-24-7.svg',
    },
    {
        title: 'Quality Delivery',
        description:
            'Commitment to delivering high-quality results on time with rigorous quality control processes.',
        image: '/assets/quality-delivery.svg',
    },
];
//  <Image
//                 src="/assets/Navlogo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 sizes="100"
//                 className="w-[100px] lg:w-[150px] h-[150px] object-contain"
//             />
