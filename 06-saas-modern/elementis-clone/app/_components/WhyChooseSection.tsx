
import React, { useEffect, useMemo, useRef, useState } from "react";

import TranslatingImage from "./TranslatingImage";
import { useScroll, useTransform, motion } from 'framer-motion';


export default function WhyChooseSection ({ mustNotShowHeader }: { mustNotShowHeader: React.RefObject<boolean> }) {
    const containerRef = useRef<HTMLElement>(null);
    const [windowHeight, setWindowHeight] = useState(0);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    const [{ containerTop, textContainerHeight }, setTextContainerHeight] = useState({ containerTop: 0, textContainerHeight: 0 });
    const endOfFirstScroll = useMemo(() => containerTop + textContainerHeight - windowHeight, [containerTop, textContainerHeight, windowHeight]);

    const { scrollY } = useScroll({ 
        target: containerRef
    });
    const textTranslateY = useTransform(scrollY, [containerTop, endOfFirstScroll], [0, -textContainerHeight + windowHeight]);

    const opacityForFirstSection = useTransform(scrollY, [endOfFirstScroll, endOfFirstScroll + windowHeight], [0, 1]);
    const scaleForFirstSection = useTransform(scrollY, [endOfFirstScroll, endOfFirstScroll + windowHeight], [1, 0.88]);
    const scaleForSecondSection = useTransform(scrollY, [endOfFirstScroll, endOfFirstScroll + windowHeight], [0.88, 1]);

    useEffect(() => {
        const textContainer = document.getElementById('text-container1');
        if(!textContainer || !containerRef.current) return;

        const containerTop = containerRef.current.offsetTop;
        const textContainerHeight = textContainer.offsetHeight;
        setTextContainerHeight({ containerTop, textContainerHeight });
    }, []);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        setIsMobileDevice(window.innerWidth < 960);
    }, []);

    return (
        <motion.section 
            ref={containerRef}
            onViewportEnter={isMobileDevice ? undefined : () => { mustNotShowHeader.current = true }}
            onViewportLeave={isMobileDevice ? undefined : () => { mustNotShowHeader.current = false }}
            className="bg-black/50"
        >
            <div style={{ height: isMobileDevice ? undefined : `${textContainerHeight}px` }} className="relative md:sticky top-0 min-h-screen">
                <motion.div style={{ scale: isMobileDevice ? 1 : scaleForFirstSection }} className="relative md:overflow-hidden md:h-screen bg-[var(--main-color)] flex flex-col-reverse md:grid grid-cols-[1fr_1.2fr] lg:gap-4 after:bg-gradient-to-b after:absolute after:z-[1] after:w-full after:h-[200px] after:left-0 after:bottom-0 after:pointer-events-none after:from-transparent after:to-[var(--main-color)] after:hidden md:after:block">
                    <motion.span style={{ opacity: isMobileDevice ? undefined : opacityForFirstSection }} className="absolute z-[3] hidden md:block top-0 left-0 w-full h-full bg-black/50"></motion.span>
                    <motion.div style={{ y: isMobileDevice ? undefined : textTranslateY }} id="text-container1" className="flex flex-col gap-20 md:gap-[120px] px-0 py-6 sm:p-6 pb-20 pt-10 md:p-20 after:w-full after:h-[200px] after:pointer-events-none after:hidden md:after:block">
                        <div className="px-4 xs:px-6 sm:px-0 flex items-center gap-2 font-geist_mono text-base lg:text-lg font-light">
                            <span>01</span>
                            <hr className="opacity-60 w-6 h-0 border-t border-[var(--text-color)]" />
                            <span className="opacity-60">02</span>
                        </div>
                        <div className="flex flex-col gap-10">
                            <h3 className="px-4 xs:px-6 sm:px-0 font-light text-2xl lg:text-3xl">Innovative Glass Solutions</h3>
                            <p className="px-4 xs:px-6 sm:px-0 text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem] max-w-[40ch]">We use Low-E solar control glass throughout, which provides a comfortable, energy-efficient, and visually appealing living environment in tropical areas. The benefits include:</p>
                            <ul className="mt-4">
                            {
                                ["Blocks 70% of the sun's infrared heat energy", "Improves thermal insulation", "Maximizes natural daylight", "Reflects solar heat", "Cooler interiors and reduced energy costs", "Creates breathtaking natural outlooks instead of traditional walls"]
                                .map((text, index) => (
                                    <li key={index} className="px-4 xs:px-6 sm:px-0 min-h-14 lg:min-h-16 py-3 flex justify-start items-center gap-6 sm:gap-8 lg:gap-12 border-t border-white/30">
                                        <span className="font-geist_mono font-light text-xs lg:text-base">{index < 9 ? `0${index + 1}` : index}</span>
                                        <span className="text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem]">{text}</span>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    </motion.div>
                    <div className="relative z-[2]">
                        <div className="relative min-h-[400px] w-full md:h-screen">
                            <div className="absolute md:relative top-0 left-0 w-full h-full">
                                <TranslatingImage src="/images/resort2.jpg" alt="image of a resort" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div style={{ scale: isMobileDevice ? undefined : scaleForSecondSection }} className={`relative bg-[var(--main-color)] flex flex-col-reverse md:grid grid-cols-[1fr_1.2fr] lg:gap-4`}>
                <div className="relative flex flex-col gap-20 md:gap-[120px] px-0 py-6 sm:p-6 pb-20 pt-10 md:p-20 after:w-full after:h-[200px] after:sticky after:bottom-0 after:pointer-events-none after:bg-gradient-to-b after:from-transparent after:to-[var(--main-color)] after:hidden md:after:block">
                    <div className="px-4 xs:px-6 sm:px-0 flex items-center gap-2 font-geist_mono text-base lg:text-lg font-light">
                        <span>02</span>
                        <hr className="opacity-60 w-6 h-0 border-t border-[var(--text-color)]" />
                        <span className="opacity-60">02</span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <h3 className="px-4 xs:px-6 sm:px-0 font-light text-2xl lg:text-3xl">World First Climate Control</h3>
                        <p className="px-4 xs:px-6 sm:px-0 text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem] max-w-[40ch]">We pioneer an innovative climate control system that outperforms any other, ending the battle with mold for an infinitely healthier experience. Combined with our solar energy system, it provides a world-first sustainable solution. The benefits include:</p>
                        <ul className="mt-4">
                        {
                            ["Built in humidity control", "Incorporated air circulation system", "Protection against mold", "Silent and sleek design", "Life expectancy of 50 years", "Easily sourced components", "Non-toxic, recyclable and non-flammable", "Only 30% of the solar energy powers the system for up to 36 hours"]
                            .map((text, index) => (
                                <li key={index} className="px-4 xs:px-6 sm:px-0 min-h-14 lg:min-h-16 py-3 flex justify-start items-center gap-8 lg:gap-12 border-t border-white/30">
                                    <span className="font-geist_mono font-light text-xs lg:text-base">{index < 9 ? `0${index + 1}` : index}</span>
                                    <span className="text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem]">{text}</span>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="sticky top-0 min-h-[400px] w-full md:h-screen">
                        <div className="absolute md:relative top-0 left-0 w-full h-full">
                            <TranslatingImage src="/images/resort1.jpg" alt="image of a resort" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}