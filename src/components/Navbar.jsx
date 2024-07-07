import Image from "next/image";
import React from "react";

export default function Navbar() {
    return (
        <nav className="z-50 sticky top-0 h-[80px] w-full border-b border-b-[#FF7306] backdrop-blur flex  justify-between px-40 items-center">
            <Image
                src="/assets/Navlogo.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[100px] h-[60px] object-cover scale-125"
            />

            <ul className="flex gap-10 justify-end  text-md">
                {links.map((link, i) => (
                    <li
                        key={link}
                        className="hover:text-[#FF7306] cursor-pointer">
                        {link}
                    </li>
                ))}
            </ul>
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
