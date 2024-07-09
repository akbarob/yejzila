"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";

export default function MobileNav({ links, navbarBg }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="lg:hidden">
            {" "}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className={` ${
                            !navbarBg
                                ? "border-white"
                                : "border-primary100 text-primary100"
                        } border-2 hover:bg-transparent `}>
                        <RxHamburgerMenu size={25} color="" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between">
                    <SheetHeader>
                        <SheetTitle className="text-center">
                            {" "}
                            <Image
                                src="/assets/Navlogo.svg"
                                alt="logo"
                                width={100}
                                height={100}
                                sizes="100"
                                className="w-[100px] h-[60px] object-contain mx-auto"
                            />
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col justify-start  h-full gap-4 py-4 ">
                        <ul className="flex flex-col justify-center items-center gap-4 ">
                            {links.map((link, i) => (
                                <li
                                    key={link}
                                    className="text-left p-2 bg-primary100/20 hover:text-primary100 font-medium w-full rounded">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter> */}
                    <div>© Copyright - Yejzila™️</div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
