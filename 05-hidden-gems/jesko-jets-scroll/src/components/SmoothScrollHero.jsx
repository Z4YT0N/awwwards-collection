"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

import innerImage from "@/assets/images/innerImage.webp";
import outerImage from "@/assets/images/outerImage.webp";
import shadowImage from "@/assets/images/shadowImage.webp";
import skyImage from "@/assets/images/skyImage.webp";
import cloudsImage from "@/assets/images/cloudsImage.webp";
import aboveImage from "@/assets/images/aboveImage.webp";
import skyightLogo from "@/assets/images/logo.svg";
import About from './About';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollHero = () => {
    const scopeRef = useRef(null);
    const mainContainer = useRef(null);
    const windowRef = useRef(null);
    const contentRef = useRef(null);
    const logoRef = useRef(null);
    const secondSectionRef = useRef(null);
    const cloudsRef = useRef(null);
    const revealRef = useRef(null);

    // Initial Reveal Effect: Logo shows instantly, rest follows after 1s
    useEffect(() => {
        const timer = setTimeout(() => {
            gsap.to(revealRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });
        }, 1000); // 1 second delay where ONLY the logo is visible

        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top top",
                end: "+=250%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        tl.to(windowRef.current, {
            scale: 5,
            rotation: 0.01,
            force3D: true,
            duration: 10,
            ease: "power2.in"
        }, 0)
            .to(contentRef.current, {
                scale: 5,
                opacity: 0,
                duration: 8,
                ease: "power2.in"
            }, 0)
            .to(".scroll-indicator", { opacity: 0, duration: 1 }, 0);

        const logoMoveFactor = window.innerWidth < 1024 ? 0.43 : 0.44;

        tl.to(logoRef.current, {
            y: -window.innerHeight * logoMoveFactor,
            scale: 0.6,
            duration: 8,
            ease: "power2.inOut"
        }, 1.5);

        tl.fromTo(secondSectionRef.current,
            {
                opacity: 0,
                y: 150,
                scale: 0.85,
                filter: "blur(10px)"
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 7,
                ease: "power3.out"
            },
            9
        );

        gsap.fromTo(
            cloudsRef.current,
            { xPercent: 0 },
            {
                xPercent: -50,
                duration: 30,
                repeat: -1,
                ease: "none",
            }
        );

    }, { scope: scopeRef });

    return (
        <div ref={scopeRef} className="relative">
            {/* 1. Logo and Navbar are visible instantly */}
            <Navbar />

            <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none">
                <div className="w-[200px] sm:w-[220px] lg:w-[250px]">
                    <Image
                        ref={logoRef}
                        src={skyightLogo}
                        alt="Skyight Logo"
                        className="w-full h-auto object-contain ml-1"
                        priority
                    />
                </div>
                {/* <h1 className='text-4xl ml-1'>Jesko Jets</h1> */}
            </div>

            {/* 2. Content is hidden by default with inline style to prevent "sky flash" */}
            <div ref={revealRef} style={{ opacity: 0 }}>
                <div className="fixed inset-0 -z-50" style={{ transform: 'translate3d(0,0,0)' }}>
                    <Image
                        src={skyImage}
                        alt="sky"
                        fill
                        className="object-cover object-bottom"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>

                <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
                    <div
                        ref={cloudsRef}
                        className="absolute inset-0 h-full w-[1500%] sm:w-[500%]"
                        style={{
                            backgroundImage: `url(${cloudsImage.src})`,
                            backgroundSize: '50% 100%', // Each "tile" is 100% of screen width
                            backgroundRepeat: 'repeat-x',
                            opacity: 0.6,
                            willChange: 'transform',
                            transform: 'translate3d(0,0,0)'
                        }}
                    />
                </div>

                <div ref={mainContainer} className="relative w-full h-screen overflow-hidden">
                    <div ref={windowRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform" style={{ perspective: '1000px', backfaceVisibility: 'hidden' }}>
                        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                            <Image
                                src={innerImage}
                                alt="inner"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] z-10"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <Image
                                src={shadowImage}
                                alt="shadow"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] opacity-50 z-20"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <Image
                                src={outerImage}
                                alt="outer"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] z-30"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <div className="absolute top-[22.5%] left-[50%] md:top-[10%] md:left-[50.3%] -translate-x-1/2 w-[50%] md:w-[24%] h-auto z-10">
                                <Image src={aboveImage} alt="above fixture" width={400} height={200} className="object-contain" quality={100} unoptimized />
                            </div>
                        </div>
                    </div>

                    <div ref={contentRef} className="absolute inset-0 z-20 flex items-center justify-between px-20 text-white pointer-events-none">
                        <div className="hero-text-left max-w-md">
                            <h1 className="text-4xl md:text-5xl lg:text-[66px] leading-6 sm:leading-10 md:leading-12 lg:leading-14 tracking-tight font-bold -mt-64 lg:-mt-0 -ml-10 sm:-ml-0 -mr-10 sm:-mt-40 lg:pt-10">We are<br />movement</h1>
                            <div className="mt-20 space-y-4 lg:block hidden">
                                <h2 className="text-base sm:text-lg leading-5 font-medium">Your<br />freedom to<br />enjoy life</h2>
                                <p className="w-10 h-px bg-white" />
                                <p className="md:text-[10px] lg:text-[11px] font-semibold leading-4 max-w-[300px]">Every flight is designed around your comfort, time, and ambitions.</p>
                            </div>
                        </div>
                        <div className="hero-text-right max-w-md flex flex-col items-end">
                            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold leading-6 sm:leading-10 md:leading-12 lg:leading-14 text-right mt-96 sm:mt-0 mr-88 sm:mr-0 md:pt-60 lg:pt-20">We are<br />distinction</h1>
                        </div>
                    </div>

                    <div className="scroll-indicator absolute bottom-20 right-20 z-20 text-white md:w-[30%] lg:w-[25%]">
                        <div className="mb-4 h-[1px] w-full bg-white" />
                        <div className="hidden sm:flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[8px] lg:text-[9px] font-bold tracking-tight">
                                <div className="flex flex-col -space-y-2">
                                    <ChevronDown size={15} />
                                    <ChevronDown size={15} className='-mt-[11px]' />
                                    <ChevronDown size={15} className='-mt-[11px]' />
                                </div>
                                <span>SCROLL DOWN</span>
                            </div>
                            <p className='text-[8px] lg:text-[9px] tracking-tight'>TO START THE JOURNEY</p>
                        </div>
                    </div>

                    <div ref={secondSectionRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-left text-white px-4 sm:px-8 md:px-10 pointer-events-none opacity-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] w-full sm:max-w-6xl leading-8 sm:leading-10 md:leading-12 lg:leading-14">
                            <span className="font-bold tracking-tight">Jesko Jets®</span> is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.
                        </h2>
                    </div>
                </div>

                <About />
            </div>
        </div>
    );
};

export default SmoothScrollHero;