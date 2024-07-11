import Image from "next/image";
import React from "react";

export default function Expertise() {
    return (
        <div className="flex justify-start items-center gap-20 px-10 lg:px-40 py-20 h-full">
            <div className="hidden lg:block flex-1">
                <Image
                    src={`/assets/expertise.png`}
                    alt=""
                    height={100}
                    width={100}
                    sizes="100"
                    className="w-full h-[700px] object-left object-cover"
                />
            </div>
            <div className="flex flex-col gap-8  lg:w-1/2">
                <h3 className="font-semibold text-4xl text-left">
                    Our Expertise
                </h3>

                <p className="w-full max-w-[800px] text-lg text-slate-600">
                    Our team of experienced professionals possesses a deep
                    understanding of the complexities of the energy and mining
                    industries, enabling us to deliver innovative and effective
                    solutions.
                </p>

                <div className="flex justify-center items-start gap-4">
                    <span className=" p-6 w-[40px] h-[40px] rounded-[6px] bg-primary100 flex justify-center items-center">
                        1
                    </span>

                    <div>
                        {" "}
                        <h3 className="font-semibold text-4xl text-left">
                            Geological Expertise
                        </h3>
                        <p className="w-full max-w-[800px] text-lg text-slate-600">
                            We leverage our geological expertise to identify and
                            evaluate promising reserves, ensuring efficient and
                            responsible resource extraction.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center items-start gap-4">
                    <span className=" p-6 w-[40px] h-[40px] rounded-[6px] bg-primary100 flex justify-center items-center">
                        2
                    </span>

                    <div>
                        {" "}
                        <h3 className="font-semibold text-4xl text-left">
                            Engineering Excellence
                        </h3>
                        <p className="w-full max-w-[800px] text-lg text-slate-600">
                            Our team of engineers designs and implements
                            sustainable solutions for infrastructure
                            development, production optimization, and
                            environmental protection.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-start gap-4">
                    <span className=" p-6 w-[40px] h-[40px] rounded-[6px] bg-primary100 flex justify-center items-center">
                        3
                    </span>

                    <div>
                        {" "}
                        <h3 className="font-semibold text-4xl text-left">
                            Operational Efficiency{" "}
                        </h3>
                        <p className="w-full max-w-[800px] text-lg text-slate-600">
                            We optimize operations through advanced technology,
                            data analytics, and continuous improvement
                            initiatives, maximizing efficiency and resource
                            utilization.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center items-start gap-4">
                    <span className=" p-6 w-[40px] h-[40px] rounded-[6px] bg-primary100 flex justify-center items-center">
                        4
                    </span>

                    <div>
                        {" "}
                        <h3 className="font-semibold text-4xl text-left">
                            Environmental Responsibility{" "}
                        </h3>
                        <p className="w-full max-w-[800px] text-lg text-slate-600">
                            We prioritize sustainability in all our operations,
                            minimizing environmental impact and promoting
                            responsible resource management.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
