"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    HardHat,
    Flame,
    Building2,
    HeadphonesIcon,
    BadgeCheck,
    Wrench,
} from "lucide-react";

const Offers = [
    {
        text: "Professional Engineers",
        icon: HardHat,
        description: "Certified experts delivering precision across every discipline.",
    },
    {
        text: "Construction",
        icon: Wrench,
        description: "End-to-end construction management built for complex projects.",
    },
    {
        text: "Oil & Gas",
        icon: Flame,
        description: "Specialized solutions for exploration, extraction, and distribution.",
    },
    {
        text: "Building",
        icon: Building2,
        description: "Structural and civil engineering that stands the test of time.",
    },
    {
        text: "24/7 Support",
        icon: HeadphonesIcon,
        description: "Round-the-clock assistance whenever your operations need it.",
    },
    {
        text: "Quality Delivery",
        icon: BadgeCheck,
        description: "Uncompromising standards from project kickoff to completion.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

const titleVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function WhatWeOffer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div className="w-full flex flex-col px-10 lg:px-44 py-24 justify-center items-start gap-6 bg-white">
            <motion.h3
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
                className="font-bold text-4xl text-left tracking-tight">
                What we offer
            </motion.h3>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full text-slate-500 mb-10 text-base max-w-4xl">
                <span className="text-primary100 font-bold text-2xl">Yejzila</span>{" "}
                Support Services in conjunction with Flenco Engineers Fluid
                System&apos;s production ranges offer a diverse array of
                comprehensive engineering solutions that redefine industry standards.
            </motion.p>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full gap-6">
                {Offers.map((offer, i) => {
                    const Icon = offer.icon;
                    return (
                        <motion.div
                            key={offer.text}
                            custom={i}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={cardVariants}
                            className="group relative flex flex-col gap-4 p-7 rounded-2xl border border-slate-200 bg-white hover:border-primary100 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden">
                            {/* accent bar */}
                            <span className="absolute top-0 left-0 h-1 w-0 bg-primary100 group-hover:w-full transition-all duration-500 rounded-t-2xl" />

                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-primary100 transition-colors duration-300">
                                <Icon
                                    size={24}
                                    className="text-primary100 group-hover:text-white transition-colors duration-300"
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h4 className="font-semibold text-lg text-slate-800 group-hover:text-primary100 transition-colors duration-300">
                                {offer.text}
                            </h4>

                            <p className="text-slate-500 text-sm leading-relaxed">
                                {offer.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
