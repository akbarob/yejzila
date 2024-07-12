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

            title: "Drilling Services",
            text: "Well Drilling, Directional Drilling",
        },
        {
            image: "/assets/procurement.png",

            title: "Processing & Distribution",
            text: "Well Completion, Product Optimization, Artificial Lift Systems.",
        },
        {
            image: "/assets/procurement.png",

            title: "Maintenance and Support Services",
            text: "Well Servicing and Workover, Pipleline Maintenance, Equipment Rental and Leasing, Inspection and Testing ",
        },
        {
            image: "/assets/procurement.png",

            title: "Environmental  Services",
            text: "Environmental Impact Assessments (EIA), Waste Management, Spill Response and Reediation ",
        },
        {
            image: "/assets/procurement.png",

            title: "Engineering and Consulting Services",
            text: "Product Management, Reservoir Engineering, Feasibility Studies, Regulatory Compliance, Safety Training and Compliance",
        },
        {
            image: "/assets/procurement.png",

            title: "Specialized Services",
            text: "Offshore Services, Data Management and Analysis, Integrated Operations, Renewable Energy Services ",
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
                Oil, gas, energy, and mining servicing firms provide a wide
                range of specialized services to support exploration,
                production, and maintenance activities in these industries.
            </p>

            <div className="w-full grid md:grid-cols-2  xl:grid-cols-3 gap-x-4 gap-y-8 place-content-center">
                {services.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-3 rounded-[6px] mr-4 p-4 bg-white w-full max-w-[350px] ">
                        <div>
                            <Image
                                src={item.image}
                                alt="pic"
                                width={100}
                                height={100}
                                sizes="100"
                                className="w-full h-[200px] object-cover rounded-[6px]"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl text-primary100">
                                {item?.title}
                            </h3>
                            <p className="text-left text-lg leading-[25.3px] tracking-wide text-slate-600 line-clamp-5">
                                {item?.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
