"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { stagger, motion, animate, useInView } from "framer-motion";
import { inView } from "framer-motion";

export default function Expertise() {
    const [akbar, setakbar] = useState();
    const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });
    const [isOpen, setIsOpen] = useState(false);
    const expertise = [
        {
            id: 1,
            title: "Geological Expertise",
            desc: "We leverage our geological expertise to identify and evaluate promising reserves, ensuring efficient and responsible resource extraction.",
        },
        {
            id: 2,
            title: "Engineering Excellence",
            desc: "Our team of engineers designs and implements                            sustainable solutions for infrastructure development, production optimization, and   environmental protection.",
        },
        {
            id: 3,
            title: "Operational Efficiency",
            desc: "We optimize operations through advanced technology, data analytics, and continuous improvement initiatives, maximizing efficiency and resource utilization.",
        },
        {
            id: 4,
            title: "Environmental Responsibility",
            desc: "We prioritize sustainability in all our operations, minimizing environmental impact and promoting responsible resource management.",
        },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref);
    // Define the container variants
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

    // Define the item variants
    const itemVariants = {
        hidden: { opacity: 0, x: -20, y: -20 }, // Start from left
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.5, // Duration for each child's animation
            },
        },
    };
    return (
        <div className="flex justify-start items-center gap-20 px-10 lg:px-40 py-20 h-full">
            {akbar}
            <div className="hidden lg:block flex-1">
                <Image
                    src={`/assets/expertise.png`}
                    alt=""
                    height={100}
                    width={100}
                    sizes="100"
                    className="w-full h-[700px] object-left object-cover rounded-[6px]"
                />
            </div>
            <div className="flex flex-col gap-8  lg:w-1/2">
                <h3 className="font-semibold text-4xl text-left">
                    Our Expertise
                </h3>

                <p className="w-full max-w-[800px] text-lg text-slate-600">
                    Our team of experienced professionals possesses a deep
                    understanding of the complexities of the energy and mining
                    industries, enabling us to deliver innovative and effective
                    solutions.
                </p>
                <motion.ul
                    className="flex flex-col gap-4"
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : ""}
                    variants={containerVariants}>
                    {" "}
                    {expertise.map((item, i) => (
                        <motion.li
                            variants={itemVariants}
                            key={i}
                            className="flex justify-center items-start gap-4">
                            <span className=" p-6 w-[40px] h-[40px] rounded-[6px] bg-primary100 flex justify-center items-center">
                                {item?.id}
                            </span>

                            <div>
                                {" "}
                                <h3 className="font-semibold text-4xl text-left">
                                    {item?.title}{" "}
                                </h3>
                                <p className="w-full max-w-[800px] text-lg text-slate-600">
                                    {item?.desc}
                                </p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
}
