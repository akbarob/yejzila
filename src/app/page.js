import Aboutus from "@/components/Aboutus";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OurServices from "@/components/OurServices";
import WhatWeOffer from "@/components/WhatWeOffer";
import Image from "next/image";

export default function Home() {
    return (
        <main className="w-full h-full relative select-none">
            <Navbar />
            <div className="">
                {" "}
                <Hero />
            </div>
            <div id="aboutus">
                <Aboutus />
            </div>
            <div id="services">
                <OurServices />
            </div>
            <div>
                <Expertise />
            </div>
            <div>
                <WhatWeOffer />
            </div>
            <div className="" id="contactus">
                {" "}
                <Footer />
            </div>
        </main>
    );
}
