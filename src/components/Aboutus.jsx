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
            text: 'To be the preferred partner of choice in procurement, oil & gas, energy, mining, and workforce solutions across Africa and beyond',
        },
        {
            title: 'Our Mission',
            text: 'To provide world-class procurement, energy, and resource management services that deliver value, empower communities, and promote sustainable industrial growth.',
        },
        {
            title: 'Our Value Proposition',
            text: 'We deliver measurable results through proven excellence. Our multi-sector expertise drives operational efficiency while our commitment to local content development strengthens communities. By integrating cutting-edge technology with sustainable practices, we transform challenges into competitive advantages for our clients.',
        },
    ];
    return (
        <div>
            {' '}
            <div className='h-full w-full bg-white flex flex-col p-10 lg:px-44 justify-center items-start gap-8 '>
                <motion.h3
                    ref={ref}
                    initial='hidden'
                    animate={isInView ? 'visible' : ''}
                    variants={titleVariants}
                    className='font-semibold text-4xl text-left'>
                    About Us
                </motion.h3>

                <p className='w-full  text-lg text-slate-600'>
                    <span className='text-primary100 text-2xl'>
                        YEJZILA Resources Limited
                    </span>{' '}
                    is a dynamic and customer-focused solutions provider with
                    expertise across procurement, oil & gas, energy, mining, and
                    workforce resourcing. With a strong commitment to
                    excellence, innovation, and community development, we
                    deliver value-driven services that support industries,
                    foster growth, and ensure sustainable partnerships. Our
                    approach combines local knowledge with global best
                    practices, enabling us to meet diverse client needs while
                    promoting efficiency, cost optimization, and reliability.
                </p>

                <div
                    className='grid md:grid-cols-2 xl:grid-cols-3 gap-20 place-content-center mx-auto'
                    ref={ref2}>
                    {Grid.map((item, i) => {
                        const isEven = i % 2 === 0;
                        const itemVariants = isEven
                            ? leftVariants
                            : rightVariants;
                        return (
                            <motion.div
                                className='max-w-[350px] hover:text-white md:w-full shadow shadow-primary100/50  rounded-[6px] bg-primary100/20 hover:bg-primary100 hover:scale-105 transition-all duration-700 ease-in-out flex flex-col p-6 h-[250px] gap-4'
                                key={i}
                                // initial="hidden"
                                // animate={isInView2 ? "visible" : "null"}
                                // variants={itemVariants}
                            >
                                <p className='font-semibold text-xl'>
                                    {item.title}
                                </p>
                                <p className='text-left text-md leading-[25.3px] tracking-wide line-clamp-6 text-slate-600 text-'>
                                    {item.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
