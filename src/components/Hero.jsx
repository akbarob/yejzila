"use client";

import React from "react";
// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "./ui/button";

const CarouselImages = [
    {
        image: "/assets/hero-1.png",
        title: "Oil, Gas, Energy, and Mining",
        text: "We power your future. We develop and deliver innovative solutions for the energy and mining industries..",
        buttontext: "Learn More",
    },
    {
        image: "/assets/hero-2.png",
        title: "Oil, Gas, Energy, and Mining",
        text: "We power your future. We develop and deliver innovative solutions for the energy and mining industries..",
        buttontext: "Learn More",
    },
    {
        image: "/assets/hero-4.png",
        title: "Oil, Gas, Energy, and Mining",
        text: "We power your future. We develop and deliver innovative solutions for the energy and mining industries..",
        buttontext: "Learn More",
    },
];
export default function Hero() {
    return (
        <div className="h-[60vh] lg:h-[100vh]  w-full">
            <Swiper
                style={{
                    "--swiper-pagination-color": "#fda91b",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-inactive-color": "white",
                    "--swiper-pagination-bullet-size": "16px",
                    "--swiper-pagination-bullet-horizontal-gap": "16px",
                }}
                className="h-full"
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}>
                {CarouselImages.map((image, i) => (
                    <SwiperSlide key={image} className="relative">
                        <Image
                            src={image?.image}
                            alt="hero"
                            width={100}
                            height={100}
                            priority
                            sizes="100"
                            className="w-full h-full object-cover absolute inset-x-0 inset-y-0 z-10"
                        />
                        <div className="z-50 h-full flex flex-col justify-center items-start gap-4 absolute  inset-x-0 inset-y-0 px-10 lg:px-40">
                            <h2 className="text-3xl lg:text-6xl text-white font-bold">
                                {image?.title}
                            </h2>
                            <h6 className="text-lg lg:text-xl text-white font-semibold">
                                {image?.text}
                            </h6>
                            <Button
                                variant={"ghost"}
                                className="border text-primary100 bg-white">
                                {image?.buttontext}
                            </Button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
