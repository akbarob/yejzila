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

const CarouselImages = [
    "/assets/hero-1.png",
    "/assets/hero-2.png",
    "/assets/hero-4.png",
];
export default function Hero() {
    return (
        <div className="h-[80vh] bg-indigo-600 w-full">
            <Swiper
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
                    <SwiperSlide key={image}>
                        <Image
                            src={image}
                            alt="hero"
                            width={100}
                            height={100}
                            priority
                            sizes="100"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
