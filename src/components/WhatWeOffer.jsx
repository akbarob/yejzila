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
    Handshake,
    ArrowUpRight,
} from "lucide-react";

// Partners shown under the offer cards. `href` is optional.
const partners = [
    {
        name: "Icren Services Limited",
        href: "https://ng.linkedin.com/company/icren",
    },
    {
        name: "Stephania Support Services",
    },
];

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
            <motion.h2
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
                className="font-bold text-4xl text-left tracking-tight mb-4 text-navy100">
                What we offer
            </motion.h2>

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

                            <h3 className="font-semibold text-lg text-slate-800 group-hover:text-primary100 transition-colors duration-300">
                                {offer.text}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed">
                                {offer.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Partners */}
            <div className="mt-4 w-full rounded-2xl bg-navy900 p-7 text-white lg:p-8">
                <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <Handshake
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="text-primary100"
                        />
                    </span>
                    <h3 className="text-xl font-semibold leading-snug">
                        Our partners
                    </h3>
                </div>

                <ul className="mt-6 grid gap-x-10 border-t border-white/10 md:grid-cols-2">
                    {partners.map((partner) => (
                        <li
                            key={partner.name}
                            className="flex min-h-[76px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/10 py-4">
                            <p className="text-lg font-semibold leading-snug">
                                {partner.name}
                            </p>
                            {partner.href && (
                                <a
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${partner.name} on LinkedIn`}
                                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary100 px-5 text-[15px] font-semibold text-slate-950 transition-[background-color,transform] duration-200 hover:bg-[#ffb93f] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                    View on LinkedIn
                                    <ArrowUpRight
                                        size={18}
                                        aria-hidden="true"
                                    />
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
