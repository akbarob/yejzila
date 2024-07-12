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
            title: "History",
            text: "With decades of experience, we have established a strong foundation in the industry, constantly innovating and adapting to meet the evolving needs of our customers.",
        },
        {
            title: "Values",
            text: "Integrity, safety, innovation, and sustainability guide our every action fostering a culture of excellence and responsibility.",
        },
        {
            title: "Mission",
            text: "We strive to provide reliable, affordable energy solutions while minimizing our environmental impact and creating a positive legacy for future generations.",
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

                <p className="w-full max-w-[800px] text-lg text-slate-600">
                    We are a global leader in oil and gas exploration,
                    production, and distribution, with a commitment to
                    responsible and sustainable practices.
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
                                <p className="text-left text-lg leading-[25.3px] tracking-wide line-clamp-5 text-slate-600">
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
