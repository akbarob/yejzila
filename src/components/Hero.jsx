'use client';

import React from 'react';
// Import Swiper React components

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Button } from './ui/button';

const CarouselImages = [
    {
        image: '/assets/carousel1.jpg',
        alt: 'Refinery process units and flare stacks lit up at dusk',
        title: 'Yejzila – Premier Procurement & Supply Solutions',
        text: 'Integrated procurement and supply solutions across Oil & Gas, Energy and Mining. Connecting industries to quality products, reliable sourcing and efficient supply chain solutions.',
        buttontext: 'Discover Our Services',
    },
    {
        image: '/assets/carousel4.png',
        alt: 'Large pipeline loops at a gas processing facility',
        title: 'Yejzila Oil & Gas Procurement',
        text: 'Specialised sourcing and supply of oilfield equipment, drilling materials, pipeline components, HSE products and industrial consumables for upstream, midstream and downstream operations.',
        buttontext: 'Explore Oil & Gas',
    },

    {
        // image: '/assets/carousel2.jpg',
        // image: '/assets/photovoltaic-4525178_1920.jpg',
        image: '/assets/photovoltaic-system-2742302_1920.jpg',
        // image: '/assets/cesc-banner.webp',
        alt: 'Rows of solar panels in a green field',
        title: 'Yejzila Energy Procurement Solutions',
        text: 'Procurement and supply of conventional and renewable energy equipment, solar systems, electrical components and power infrastructure materials, supporting sustainable energy development.',
        buttontext: 'Go Green Today',
    },
    {
        image: '/assets/carousel3.jpg',
        alt: 'Bucket-wheel excavator working in an open-pit mine',
        title: 'Yejzila Mining & Industrial Procurement',
        text: 'Reliable sourcing and supply of mining equipment, heavy machinery, mineral processing materials and operational essentials for mining and mineral resource development.',
        buttontext: 'Mining Solutions',
    },
];
export default function Hero() {
    return (
        <div className='h-[60vh] lg:h-[100vh]  w-full'>
            <Swiper
                style={{
                    '--swiper-pagination-color': '#fda91b',
                    '--swiper-pagination-bullet-inactive-opacity': '1',
                    '--swiper-pagination-bullet-inactive-color': 'white',
                    '--swiper-pagination-bullet-size': '16px',
                    '--swiper-pagination-bullet-horizontal-gap': '16px',
                }}
                className='h-full'
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={50}
                slidesPerView={1}>
                {CarouselImages?.map((image, i) => {
                    // One <h1> per page: only the first slide's title is the h1
                    const Title = i === 0 ? 'h1' : 'h2';
                    return (
                    <SwiperSlide key={i} className='relative'>
                        <Image
                            src={image?.image}
                            alt={image?.alt}
                            width={100}
                            height={100}
                            // Only the first slide is visible on load
                            priority={i === 0}
                            // quality={100}
                            sizes='100vw'
                            className='w-full h-full object-center object-cover  absolute inset-x-0 inset-y-0 z-10'
                        />
                        {/* Darkens the lower half of the photo so the text stays readable */}
                        <div
                            aria-hidden='true'
                            className='absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/35 to-transparent'
                        />
                        {/* Anchored above the slide dots on phones so long text never runs off the hero */}
                        <div className='z-50 flex flex-col justify-end items-start gap-3 lg:gap-4 absolute inset-x-0 bottom-14 lg:top-52 lg:bottom-52 px-6 sm:px-10 lg:px-40'>
                            <Title className='text-2xl sm:text-3xl lg:text-6xl text-white font-bold'>
                                {image?.title}
                            </Title>
                            <p className='text-[15px] leading-relaxed sm:text-lg lg:text-xl lg:max-w-4xl text-white font-medium'>
                                {image?.text}
                            </p>
                            {/* <Button
                                variant={"ghost"}
                                className="border text-primary100 bg-white">
                                {image?.buttontext}
                            </Button> */}
                        </div>
                    </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
