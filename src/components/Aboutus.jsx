import React from "react";

export default function Aboutus() {
    const Grid = [
        {
            title: "History",
            text: "With decades of experience, we have established a strong foundation in the industry, constantly innovating and adapting to meet the evolving needs of our customers.",
        },
        {
            title: "Values",
            text: "Integrity, safety, innovation, and sustainability guide our every action fostering a culture of excellence and responsibility.",
        },
        {
            title: "Mission",
            text: "We strive to provide reliable, affordable energy solutions while minimizing our environmental impact and creating a positive legacy for future generations.",
        },
    ];
    return (
        <div>
            {" "}
            <div className="h-full lg:h-[700px] w-full bg-white flex flex-col p-10 lg:p-44 justify-center items-start gap-8 ">
                <h3 className="font-semibold text-4xl text-left">
                    About Our Company
                </h3>

                <p className="w-full max-w-[800px] text-lg text-slate-600">
                    We are a global leader in oil and gas exploration,
                    production, and distribution, with a commitment to
                    responsible and sustainable practices.
                </p>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-20 place-content-center mx-auto">
                    {Grid.map((item, i) => (
                        <div
                            className="w-[300px] md:w-full shadow border rounded-[6px]  bg-primary100/20 hover:bg-primary100 hover:scale-105 transition-all duration-700 ease-in-out flex flex-col p-6 h-[250px]  gap-4"
                            key={i}>
                            <p className="font-semibold text-xl">
                                {item.title}
                            </p>
                            <p className=" text-left text-lg leading-[25.3px] tracking-wide line-clamp-5 text-slate-600">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
