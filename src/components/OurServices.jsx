"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
            image: "/assets/procurement.png",
            title: "Exploration & Appraisal",
            text: "Utilizing cutting-edge technology and expertise, we identify and evaluate potential reserves, unlocking new sources of energy and minerals.",
        },
        {
            image: "/assets/procurement.png",

            title: "Field Development & Production",
            text: "We design, construct, and operate efficient and safe production facilities, maximizing resource extraction and optimizing operational performance.",
        },
        {
            image: "/assets/procurement.png",

            title: "Processing & Distribution",
            text: "Our sophisticated processing plants refine and enhance extracted resources, ensuring quality and efficient distribution to meet the needs of a growing global market.",
        },
        {
            image: "/assets/procurement.png",

            title: "Procurement",
            // text: "Utilizing cutting-edge technology and expertise, we identify and evaluate potential reserves, unlocking new sources of energy and minerals.",
        },
    ];
    return (
        <div className="h-full w-full bg-primary100   flex flex-col p-10 lg:px-44 justify-center items-start gap-8 ">
            <motion.h3
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : ""}
                variants={titleVariants}
                className="font-semibold text-4xl text-left">
                Our Services{" "}
            </motion.h3>

            <p className="w-full max-w-[800px] text-lg text-slate-600">
                From exploration to production, we offer a comprehensive suite
                of services to meet the diverse needs of our clients in the
                energy and mining sectors.
            </p>

            <div className="w-full grid md:grid-cols-2  xl:grid-cols-4 gap-4">
                {services.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-4 rounded-[6px] mr-4 p-4 bg-white ">
                        <div>
                            <Image
                                src={item.image}
                                alt="pic"
                                width={100}
                                height={100}
                                sizes="100"
                                className="w-full h-[200px] rounded-[6px]"
                            />
                        </div>
                        <h3 className="font-semibold text-xl text-primary100">
                            {item?.title}
                        </h3>
                        <p className="text-left text-lg leading-[25.3px] tracking-wide text-slate-600 line-clamp-5">
                            {item?.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
