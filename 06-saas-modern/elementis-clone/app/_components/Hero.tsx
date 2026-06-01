
import { useEffect, useState } from "react";
import { cubicBezier, motion, MotionValue, useTransform } from "framer-motion";

import { FiPlay } from "react-icons/fi";
import { GoArrowDown } from "react-icons/go";

import TranslatingTitle from "./TranslatingTitle";


type Props = { 
    scrollY: MotionValue<number>;
    mousePositionX: MotionValue<number>;
    mousePositionY: MotionValue<number>; 
    mouseSpeedScale: MotionValue<number>;
    translateXPercentage: MotionValue<string>;
};

const MAX_GRADIENT_BREAK = 25;
const EASE = cubicBezier(.24, .43, .15, .97);

export default function Hero({ translateXPercentage, mousePositionX, mousePositionY, mouseSpeedScale, scrollY }: Props) {
    const [windowHeight, setWindowHeight] = useState(0);

    const gradientStyling = useTransform(scrollY, () => {
        if(scrollY.get() > windowHeight) return 'linear-gradient(var(--main-background) 0 100%)';

        const gradient: string[] = [];

        for(let i = 0; i < MAX_GRADIENT_BREAK; i++) {
            const scrollYPercentage = Math.min(((scrollY.get() + 350) / (windowHeight)), 1);

            const start = ((i / MAX_GRADIENT_BREAK) * 100).toFixed(4);
            const end = (((i + 1)/MAX_GRADIENT_BREAK) * 100).toFixed(4);
            const end1 = scrollYPercentage * Number(end);

            gradient[i] = `rgba(0, 0, 0, 1) ${start}% ${end1}%, rgba(0, 0, 0, 0) ${end1}% ${end}%`;
        };

        return `linear-gradient(0deg, ${gradient.join(', ')})`;
    });

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    return (
        <section className="group overflow-x-clip">
            <div className="absolute top-0 left-0 before:absolute before:w-full before:h-full before:bg-black/30">
                <video id="hero-video" src="/hero-video.webm" autoPlay muted loop className="w-screen h-screen object-cover"></video>
                <motion.div style={{ maskImage: gradientStyling }} className="bg-[var(--main-color)] absolute top-0 left-0 w-full h-[calc(100vh_+_50px)]"></motion.div>
            </div>
            <div className="min-h-screen relative flex flex-col gap-10">
            <motion.div 
                style={{ x: mousePositionX, y: mousePositionY, scale: mouseSpeedScale }}
                className="duration-200 ease-expo transition-transform fixed top-0 left-0 pointer-events-none"
            >
                <span className="group-hover:scale-100 -translate-x-1/2 -translate-y-1/2 scale-0 ease-expo duration-500 transition-[transform] backdrop-blur-md hidden lg:flex items-center justify-center w-16 aspect-square rounded-full bg-white/20">
                    <FiPlay size={20} />
                </span>
            </motion.div>
            <div className="flex-1 flex items-end overflow-hidden">
                <motion.div 
                    className="w-full" 
                    initial={{ y: '100%' }} 
                    animate={{ y: '0%' }} 
                    transition={{ duration: 1, delay: 3.4, ease: EASE }}
                >
                    <TranslatingTitle translateXPercentage={translateXPercentage} textArray={["Wellness", "Innovation", "Community", "Nature"]} />
                </motion.div>
            </div>
            <div className="w-full max-w-[var(--max-width)] mx-auto">
                <div className="relative mx-0 md:mx-10 lg:mx-20 py-3 xs:py-4 gap-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                <motion.hr 
                    initial={{ transform: 'scaleX(0)' }} 
                    animate={{ transform: 'scaleX(100%)' }} 
                    className="absolute top-0 left-0 w-full bg-white/50 border-none outline-none origin-left h-[1px] block" 
                />
                <div className="hidden md:flex items-start justify-start">
                    <GoArrowDown size={24} />
                </div>
                <div className="flex items-center justify-center">
                    <p className="max-w-[24ch] text-sm leading-[.8rem] md:text-base md:leading-[1rem] lg:text-lg lg:leading-[1.2rem]">
                        {
                            "A lifestyle revolution for a \n sustainable fulfilling future"
                                .split(" ")
                                .map((word, index) => (
                                    word.includes("\n") ?
                                        <br key={index} /> :
                                        <span key={index} className="inline-block overflow-hidden">
                                            <motion.span 
                                                initial={{ y: '110%' }} 
                                                animate={{ y: '0%' }} 
                                                transition={{ duration: .5, delay: 3.4 + (index / 25), ease: EASE }} 
                                                className="inline-block overflow-hidden"
                                            >
                                                {word}&nbsp;
                                            </motion.span>
                                        </span>
                                ))
                        }
                    </p>
                </div>
                <div className="hidden md:block">
                    <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1, delay: 3.6, ease: EASE }} 
                        className="block float-right text-base lg:text-lg"
                    >Scroll to Explore</motion.span>
                </div>
                </div>
            </div>
            </div>
        </section>
      )
}