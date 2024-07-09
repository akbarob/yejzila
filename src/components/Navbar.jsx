"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const [navbarBg, setNavbarBg] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            if (window.scrollY > 50) {
                setNavbarBg(true);
            } else {
                setNavbarBg(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav
            className={`z-50 sticky top-0 h-[80px] w-full ${
                navbarBg
                    ? "backdrop-blur-sm  border-b border-b-primary100"
                    : "-mt-[80px]"
            } flex  justify-between px-10 lg:px-40 items-center`}>
            <Image
                src="/assets/Navlogo.png"
                alt="logo"
                width={100}
                height={100}
                sizes="100"
                className="w-[200px] h-[120px] object-cover scale-125"
            />
            {/* DESKTOP NAV */}
            <ul className="hidden lg:flex gap-10 justify-end  text-md">
                {links.map((link, i) => (
                    <li
                        key={link}
                        className="hover:text-primary100 cursor-pointer transition-all  ease-in delay-200 font-semibold">
                        {link}
                    </li>
                ))}
            </ul>

            {/* MOBILE */}
            <div>
                <MobileNav links={links} />
            </div>
        </nav>
    );
}

const links = [
    "Home",
    "About Us",
    "Projects",
    "Blog",
    "Services",
    "Contact Us",
];
