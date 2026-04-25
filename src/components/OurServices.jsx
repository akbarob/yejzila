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
            // offshore oil rig in the ocean
            image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
            title: "Drilling Services",
            text: "Well Drilling, Directional Drilling",
        },
        {
            // oil rig platform towed by support vessels at sea
            image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80",
            title: "Processing & Distribution",
            text: "Well Completion, Product Optimization, Artificial Lift Systems.",
        },
        {
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
            title: "Maintenance and Support Services",
            text: "Well Servicing and Workover, Pipeline Maintenance, Equipment Rental and Leasing, Inspection and Testing.",
        },
        {
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
            title: "Environmental Services",
            text: "Environmental Impact Assessments (EIA), Waste Management, Spill Response and Remediation.",
        },
        {
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            title: "Engineering and Consulting Services",
            text: "Project Management, Reservoir Engineering, Feasibility Studies, Regulatory Compliance, Safety Training.",
        },
        {
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
            title: "Specialized Services",
            text: "Offshore Services, Data Management and Analysis, Integrated Operations, Renewable Energy Services.",
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
                                alt={item.title}
                                width={800}
                                height={400}
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="w-full h-[200px] object-cover rounded-[6px]"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-primary100">
                                {item?.title}
                            </h3>
                            <p className="text-left text-sm font-normal leading-[25.3px] tracking-wide text-slate-600 line-clamp-5">
                                {item?.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
