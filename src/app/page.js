import Aboutus from "@/components/Aboutus";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OurServices from "@/components/OurServices";
import Image from "next/image";

export default function Home() {
    return (
        <main className="w-full h-full relative select-none">
            <Navbar />
            <div className="">
                {" "}
                <Hero />
            </div>
            <div>
                <Aboutus />
            </div>
            <div>
                <OurServices />
            </div>
            <div>
                <Expertise />
            </div>
            <div className="w-full flex flex-col px-10 lg:px-44 py-20 justify-center items-start gap-6">
                <p className="font-semibold text-4xl text-left">
                    What we offer
                </p>{" "}
                <p className="w-full max-w-[600px] text-slate-600 mb-14 text-lg">
                    <span className="text-[#FF7306] font-bold text-2xl">
                        Yejzila
                    </span>{" "}
                    Support Services in conjunction with Flenco Engineers Fluid
                    System&apos;s production ranges offer a diverse array of
                    comprehensive engineering solutions that redefine industry
                    standards.
                </p>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 w-[80%] gap-6 mx-auto place-content-center place-items-center">
                    {Offers.map((offer, i) => (
                        <div
                            key={offer}
                            className="bg-slate-300 h-[250px] border rounded flex items-center justify-center hover:bg-primary100 transition-all duration-700 w-[250px] ">
                            {offer?.text}
                        </div>
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
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
