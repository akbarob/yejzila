'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
            <div className='grid md:grid-cols-2 xl:grid-cols-3 w-[80%] gap-6 mx-auto place-content-center place-items-center'>
                {Offers.map((offer, i) => (
                    <div
                        key={offer}
                        className="bg-slate-300 hover:bg-[url('/assets/Navlogo.svg')] hover:text-white hover:bg-contain hover:bg-center hover:bg-no-repeat h-[250px] border rounded flex items-center justify-center transition-all duration-700 w-[250px]">
                        {offer?.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
const Offers = [
    { text: 'Professional Engineers', icon: '' },
    { text: 'Construction', icon: '' },
    { text: 'Oil & Gas', icon: '' },
    { text: 'Building', icon: '' },
    { text: '24/7 Support', icon: '' },
    { text: 'Quality Delivery', icon: '' },
];
//  <Image
//                 src="/assets/Navlogo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 sizes="100"
//                 className="w-[100px] lg:w-[150px] h-[150px] object-contain"
//             />
