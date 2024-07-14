import Image from "next/image";
import React from "react";

function getCurrentYear() {
    return new Date().getFullYear();
}

export default function Footer() {
    return (
        <div className="bg-black h-full  text-white px-10 lg:px-40 space-y-8">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center ">
                <div>
                    <Image
                        src="/assets/Navlogo.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        sizes="100"
                        className="w-[250px] lg:w-[250px] h-[250px] object-contain"
                    />
                </div>
                <div className="space-y-4">
                    <p className="uppercase">Contact Us</p>
                    <p>
                        Email:{" "}
                        <a href="mailto:info@yejzila.com">info@yejzila.com</a>
                    </p>
                    <p>
                        Phone: <a href="">+234 903 614 3222</a>
                    </p>{" "}
                    {/* <p>
                        Phone: <a href="">+1</a>
                    </p>{" "} */}
                    <p>
                        Phone: <a href="">+44 744 243 7146</a>
                    </p>
                </div>
            </div>
            <div className="text-center py-4">
                © Copyright - Yejzila™️ {getCurrentYear()}
            </div>
        </div>
    );
}
