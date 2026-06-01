"use client"

import React, { useRef } from 'react';
import Image from 'next/image';
import innerImage from "@/assets/images/innerImage.webp";
import outerImage from "@/assets/images/outerImage.webp";
import shadowImage from "@/assets/images/shadowImage.webp";
import aboveImage from "@/assets/images/aboveImage.webp";
import skyImage from "@/assets/images/skyImage.webp";
import cloudsImage from "@/assets/images/cloudsImage.webp";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
    const container = useRef(null);
    const cloudRef = useRef(null);

    useGSAP(() => {
        gsap.to(cloudRef.current, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1
        })
    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 w-full h-full -z-10 overflow-hidden">

            {/* Inner Image - Uses object-contain on mobile so the frame "scales down" to fit */}
            <div className="absolute inset-0 -z-40">
                <Image
                    src={innerImage}
                    alt="Inner Background"
                    fill
                    className="object-contain sm:object-cover scale-100 sm:scale-[1.28]"
                    priority
                    quality={100}
                />
            </div>

            <div className="absolute inset-0 -z-45 overflow-hidden">
                <div
                    ref={cloudRef}
                    className="flex w-[200%] h-full"
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={cloudsImage}
                            alt="Clouds"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src={cloudsImage}
                            alt="Clouds"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Outer Image - Changed to object-contain for mobile fit */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={outerImage}
                    alt="Outer Background"
                    fill
                    className="object-contain sm:object-cover scale-100 sm:scale-[1.28]"
                    priority
                    quality={100}
                />
            </div>

            {/* Shadow Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src={shadowImage}
                    alt="Shadow Background"
                    fill
                    className="object-contain sm:object-cover scale-100 sm:scale-[1.50]"
                    priority
                    quality={100}
                />
            </div>

            {/* Sky Image - Kept as object-cover so there are no empty bars on mobile */}
            <div className="absolute inset-0 -z-50">
                <Image
                    src={skyImage}
                    alt="Sky Background"
                    fill
                    className="object-cover object-top"
                    priority
                    quality={100}
                />
            </div>

            {/* Upper Image - Not touched as requested */}
            <div className="absolute top-14.5 left-[38%] -z-40 w-[80%] h-auto">
                <Image
                    src={aboveImage}
                    alt="Above Background"
                    width={330}
                    height={200}
                    className="object-contain"
                    priority
                    quality={100}
                />
            </div>

        </div>
    );
};

export default Hero;