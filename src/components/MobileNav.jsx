"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MobileNav({ links, navbarBg }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`border-2 hover:bg-transparent hover:text-primary100 ${
                            !navbarBg
                                ? "border-white text-white"
                                : "border-primary100 text-primary100"
                        }`}>
                        <RxHamburgerMenu size={22} />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="flex flex-col w-[280px] p-0 border-l border-primary100/20 bg-white">

                    {/* Header */}
                    <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100 bg-slate-900 rounded-t-lg">
                        <SheetTitle>
                            <Image
                                src="/assets/Navlogo.svg"
                                alt="Yejzila logo"
                                width={300}
                                height={300}
                                priority
                                className="w-[130px] h-auto object-contain"
                            />
                        </SheetTitle>
                        <SheetDescription />
                    </SheetHeader>

                    {/* Nav links */}
                    <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                        {links.map((link) => (
                            <Link
                                href={link.link}
                                key={link.title}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-primary100/10 hover:text-primary100 transition-colors duration-200">
                                {link.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-100 text-center text-sm text-slate-400">
                        © {new Date().getFullYear()} <span className="text-primary100 font-semibold">Yejzila™️</span> — All rights reserved
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
