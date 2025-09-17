'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
    const services = [
        {
            image: '/assets/procurement-supply-chain.svg',
            title: 'Procurement & Supply Chain Solutions',
            text: 'Strategic sourcing of equipment, machinery & materials. Industrial tools, spare parts & consumables supply. Vendor management, import/export logistics, contract negotiation & cost optimization. Community-focused procurement services.',
        },
        {
            image: '/assets/oil-gas-services.svg',
            title: 'Oil & Gas Services',
            text: 'Oilfield equipment, drilling tools & rigs procurement. Chemicals, lubricants & petroleum products supply. EPC support, marine logistics & offshore services. MRO solutions & technical manpower for oil & gas projects.',
        },
        {
            image: '/assets/energy-services.svg',
            title: 'Energy Services',
            text: 'Renewable energy solutions (solar, wind, hydro). Power generation equipment & electrical infrastructure supply. Energy efficiency consulting & backup power solutions. Technical training & manpower in energy sector.',
        },
        {
            image: '/assets/mining-mineral-resources.svg',
            title: 'Mining & Mineral Resources',
            text: 'Mining equipment, heavy machinery & spare parts supply. Geological survey support & exploration logistics. Safety equipment for mining sites. Community relations, consultancy & export facilitation services.',
        },
        {
            image: '/assets/recruitment-workforce.svg',
            title: 'Recruitment & Workforce Solutions',
            text: 'Executive search & headhunting for industry roles. Technical manpower supply (Oil, Gas, Mining, Energy). Graduate placement programs & workforce training development.',
        },
    ];

    return (
        <div className='h-full w-full bg-primary100   flex flex-col p-10 lg:px-44 justify-center items-start gap-8 '>
            <motion.h3
                ref={ref}
                initial='hidden'
                animate={isInView ? 'visible' : ''}
                variants={titleVariants}
                className='font-semibold text-4xl text-left'>
                Our Core Services{' '}
            </motion.h3>

            <p className='w-full max-w-[800px] text-lg text-slate-600'>
                Oil, gas, energy, and mining servicing firms provide a wide
                range of specialized services to support exploration,
                production, and maintenance activities in these industries.
            </p>

            <div className='w-full grid md:grid-cols-2  xl:grid-cols-3 gap-x-4 gap-y-8 place-content-center'>
                {services.map((item, i) => (
                    <div
                        key={i}
                        className='flex flex-col gap-3 rounded-[6px] mr-4 p-4 bg-white w-full max-w-[350px] '>
                        <div>
                            <Image
                                src={item.image}
                                alt='pic'
                                width={100}
                                height={100}
                                sizes='100'
                                className='w-full h-[200px] object-cover rounded-[6px]'
                            />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg text-primary100'>
                                {item?.title}
                            </h3>
                            <p className='text-left text-sm leading-[25.3px] tracking-wide text-slate-600 line-clamp-5'>
                                {item?.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
