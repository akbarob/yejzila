import Image from 'next/image';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';
function getCurrentYear() {
    return new Date().getFullYear();
}

export default function Footer() {
    return (
        <div className='bg-black h-full  text-white px-10 lg:px-40 space-y-8'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center '>
                <div>
                    <Image
                        src='/assets/Navlogo.svg'
                        alt='logo'
                        width={100}
                        height={100}
                        sizes='100'
                        className='w-[250px] lg:w-[250px] h-[250px] object-contain'
                    />
                </div>
                <div className='space-y-4'>
                    <p className='uppercase'>Contact Us</p>
                    <p>
                        Email:{' '}
                        <a href='mailto:info@yejzila.com'>info@yejzila.com</a>
                    </p>
                    <p>
                        NG: <a href='tel:+2349036143222'>+234 903 614 3222</a>
                    </p>
                    <p>
                        UK: <a href='tel:+447442437146'>+44 744 243 7146</a>
                    </p>

                    <a
                        href='https://www.instagram.com/yejzila_resources?igsh=ZWFicWtwN3psbGtn '
                        className='flex gap-2 justify-start items-center'>
                        <FaInstagram />
                        Instagram
                    </a>
                </div>
            </div>
            <div className='text-center py-4'>
                © Copyright - Yejzila™️ {getCurrentYear()}
            </div>
        </div>
    );
}
