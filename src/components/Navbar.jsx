"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [navbarBg, setNavbarBg] = useState(false);
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            if (
                currentScrollY > lastScrollY &&
                currentScrollY > 300 &&
                scrollDirection !== "down"
            ) {
                setScrollDirection("down");
            } else if (
                currentScrollY < lastScrollY &&
                scrollDirection !== "up"
            ) {
                setScrollDirection("up");
            }

            if (currentScrollY <= 300) {
                setScrollDirection("up"); // Always show navbar if within 100px from the top
            }

            if (currentScrollY > 50) {
                setNavbarBg(true);
            } else {
                setNavbarBg(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollDirection]);

    return (
        <nav
            className={`z-50 fixed top h-[80px] w-full transition-transform duration-300 ${
                scrollDirection === "up"
                    ? "transform translate-y-0"
                    : "transform -translate-y-full"
            } flex justify-between pl-5 pr-10 lg:px-28 xl:px-40 items-center ${
                navbarBg
                    ? "backdrop-blur-sm bg-primary100/20 lg:bg-transparent text-black border-b-2 border-b-primary100"
                    : "text-white"
            }`}>
            <Image
                src="/assets/Navlogo.svg"
                alt="logo"
                width={100}
                height={100}
                sizes="100"
                className="w-[100px] lg:w-[150px] h-[150px] object-contain"
            />
            {/* DESKTOP NAV */}
            <ul className="hidden lg:flex gap-10 justify-end text-md w-full">
                {links.map((link, i) => (
                    <li
                        key={link}
                        className="hover:text-primary100 cursor-pointer transition-all ease-in duration700 font-semibold p-2 hover:border-b hover:border-b-primary100">
                        {link}
                    </li>
                ))}
            </ul>

            {/* MOBILE */}
            <div>
                <MobileNav links={links} navbarBg={navbarBg} />
            </div>
        </nav>
    );
}

const links = ["Home", "About Us", "Projects", "Services", "Contact Us"];
