import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <main className="w-full h-full relative">
            <Navbar />
            <div className="">
                {" "}
                <Hero />
            </div>

            <div className="h-[250px] w-full bg-primary100  flex flex-col p-10 lg:p-44 justify-center items-start gap-4 ">
                <p className="font-semibold text-4xl text-left">Who we are</p>

                <p className="w-full max-w-[800px]">
                    We&apos;re industry leader that has been built to be
                    effective and efficient in providing world class
                    engineering, procurement and construction services;
                    supporting businesses in the oil and gas, construction,
                    power energy and transportation sectors.
                </p>
            </div>

            <div className="w-full flex flex-col px-10 lg:px-44 py-20 justify-center items-center gap-6">
                <p className="font-semibold text-4xl text-left">
                    What we offer
                </p>{" "}
                <p className="w-full max-w-[600px] text-slate-600 mb-14">
                    <span className="text-[#FF7306] font-bold">Yejzila</span>{" "}
                    Support Services in conjunction with Flenco Engineers Fluid
                    System&apos;s production ranges offer a diverse array of
                    comprehensive engineering solutions that redefine industry
                    standards.
                </p>
                <div className="grid lg:grid-cols-3 w-[70%] gap-6">
                    {Offers.map((offer, i) => (
                        <div
                            key={offer}
                            className="bg-slate-300 h-[250px] border rounded flex items-center justify-center hover:bg-primary100 transition-all duration-700">
                            {offer?.text}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
const Offers = [
    { text: "Professional Engineers", icon: "" },
    { text: "Construction", icon: "" },
    { text: "Oil & Gas", icon: "" },
    { text: "Building", icon: "" },
    { text: "24/7 Support", icon: "" },
    { text: "Quality Delivery", icon: "" },
];
