import Image from "next/image";
import React from "react";

export default function OurServices() {
    const services = [
        {
            title: "Exploration & Appraisal",
            text: "Utilizing cutting-edge technology and expertise, we identify and evaluate potential reserves, unlocking new sources of energy and minerals.",
        },
        {
            title: "Field Development & Production",
            text: "We design, construct, and operate efficient and safe production facilities, maximizing resource extraction and optimizing operational performance.",
        },
        {
            title: "Exploration & Appraisal",
            text: "Our sophisticated processing plants refine and enhance extracted resources, ensuring quality and efficient distribution to meet the needs of a growing global market.",
        },
        {
            title: "Procurement",
            // text: "Utilizing cutting-edge technology and expertise, we identify and evaluate potential reserves, unlocking new sources of energy and minerals.",
        },
    ];
    return (
        <div className="h-full lg:h-[700px] w-full bg-primary100   flex flex-col p-10 lg:p-44 justify-center items-start gap-8 ">
            <h3 className="font-semibold text-4xl text-left">Our Services </h3>

            <p className="w-full max-w-[800px] text-lg text-slate-600">
                From exploration to production, we offer a comprehensive suite
                of services to meet the diverse needs of our clients in the
                energy and mining sectors.
            </p>

            <div className="w-full grid md:grid-cols-2 xl:grid-cols-4  gap-4">
                {services.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-4 rounded-[6px] mr-4 p-4 bg-white ">
                        <div>
                            <Image
                                src="/assets/explore.png"
                                alt="pic"
                                width={100}
                                height={100}
                                sizes="100"
                                className="w-full h-full rounded-[6px]"
                            />
                        </div>
                        <h3 className="font-semibold text-xl text-primary100">
                            {item?.title}
                        </h3>
                        <p className="text-left text-lg leading-[25.3px] tracking-wide text-slate-600">
                            {item?.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
