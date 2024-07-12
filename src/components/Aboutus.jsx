"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
        hidden: { opacity: 0, x: -20 },
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
                duration: 0.5,
            },
        },
    };
    const Grid = [
        {
            title: "Vision",
            text: "To be the leading provider of comprehensive servicing solutions in the oil, gas, energy, and mining industries, recognized for our dedication to safety, sustainability, and technological advancement.",
        },
        {
            title: "Mission",
            text: "To enhance operational efficiency, ensure safety and minimize environmental impact by leveraging advanced technologies, industry expertise to deliver innovative and sustainable solutions while commitment to excellence.",
        },
        {
            title: "Value",
            text: "Core values for an oil, gas, energy, and mining servicing firm often reflect a commitment to safety, environmental responsibility, innovation, and integrity. ",
        },
    ];
    return (
        <div>
            {" "}
            <div className="h-full w-full bg-white flex flex-col p-10 lg:px-44 justify-center items-start gap-8 ">
                <motion.h3
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : ""}
                    variants={titleVariants}
                    className="font-semibold text-4xl text-left">
                    About Us
                </motion.h3>

                <p className="w-full  text-lg text-slate-600">
                    <span className="text-primary100 text-2xl">
                        Yejzila Resources Limited
                    </span>{" "}
                    is a company operating in the oil, gas, energy, and mining
                    sectors. The company is engaged in the exploration,
                    extraction, and distribution of natural resources. Yejzila
                    Resources Limited focuses on sustainable practices and
                    innovative technologies to maximize resource utilization
                    while minimizing environmental impact. The company is
                    committed to safety, efficiency, and regulatory compliance,
                    aiming to contribute to the global energy supply and
                    economic growth.
                </p>

                <div
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-20 place-content-center mx-auto"
                    ref={ref2}>
                    {Grid.map((item, i) => {
                        const isEven = i % 2 === 0;
                        const itemVariants = isEven
                            ? leftVariants
                            : rightVariants;
                        return (
                            <motion.div
                                className="w-[300px] md:w-full shadow border rounded-[6px] bg-primary100/20 hover:bg-primary100 hover:scale-105 transition-all duration-700 ease-in-out flex flex-col p-6 h-[250px] gap-4"
                                key={i}
                                initial="hidden"
                                animate={isInView2 ? "visible" : "null"}
                                variants={itemVariants}>
                                <p className="font-semibold text-xl">
                                    {item.title}
                                </p>
                                <p className="text-left text-md leading-[25.3px] tracking-wide line-clamp-6 text-slate-600 text-">
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
