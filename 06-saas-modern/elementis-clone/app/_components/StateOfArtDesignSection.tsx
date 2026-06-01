

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TranslatingTitle from "./TranslatingTitle";
import { MotionValue, ResolvedValues, motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import Image from "next/image";


type Props = {
    isScrollingDown: boolean;
    mousePositionX: MotionValue<number>;
    mousePositionY: MotionValue<number>;
    translateXPercentage: MotionValue<string>;
};

const CAROUSEL_VALUES = [
  {
    title: "Natural Materials",
    desc: "At Transira our eco-friendly vibes is enhanced by using sustainably sourced natural materials such as wood, stone, bamboo and cork.",
    image: ""
  },
  {
    title: "Panoramic Windows",
    desc: "Large, expansive windows offer guests breathtaking views of the surrounding natural landscapes. The floor-to-ceiling windows bring the outdoors inside.",
    image: ""
  },
  {
    title: "Warm Earthy tone",
    desc: "Elementis color pallete is inspired by Nature, such as warm earthy tones like browns, greens, and beiges. These colors create a cozy and inviting ambiance.",
    image: ""
  },
  {
    title: "Tactile Textures",
    desc: "You will find a variety of tactile textures such as plush rugs, soft upholstery fabrics, natural textiles like linen and cotton. This adds depth and richness to the interior design.",
    image: ""
  },
  {
    title: "Luxurious Touches",
    desc: "Luxurious elements like velvet accents, metallic finishes, and statement lighting fixtures elevate the overall aesthetics and create a sense of subtle opulence.",
    image: ""
  },
  {
    title: "Biophilic Design",
    desc: "By integrating indoor plants and biophilic design elements, it brings a sense of nature indoors. Living green walls, potted plants, and natural light enhances the eco-friendly theme.",
    image: ""
  },
  {
    title: "Sustainable Lighting",
    desc: "Our and residency use energy-efficient lighting solutions like LED fixtures and use natural light. Dimmers are used to create different moods throughout the day.",
    image: ""
  },
  {
    title: "Minimalist Furniture",
    desc: "Sleek, modern furniture with clean lines to enhance the space's eco-friendly luxury, prioritizing quality for a sophisticated look.",
    image: ""
  },
  {
    title: "Personalized Touches",
    desc: "We personalize spaces with natural elements, local art, handmade decor, and custom furniture for a unique, memorable character",
    image: ""
  },
]

export default function StateOfArtDesignSection({ translateXPercentage, mousePositionX, mousePositionY }: Props) {
    const [carouselWidth, setCarouselWidth] = useState(0);
    const lineProgressScale = useMotionValue(0);

    const handleDrag = (latest: ResolvedValues) => {
        lineProgressScale.set(Math.max(0, ((Number(latest.x)) / carouselWidth)));
    }

    useEffect(() => {
        const carousel = document.getElementById('state-of-art-carousel');

        if(!carousel) return;
        setCarouselWidth(carousel.offsetWidth - carousel.scrollWidth);
    }, [])

    return (
        <section className="bg-[var(--tetiary-color)]">
            <div className="font-open_sans max-w-[var(--max-width)] pt-[100px] sm:pt-[120px] md:pt-[240px] pb-10 overflow-hidden flex items-center text-[6rem] leading-[6rem] xs:text-[8rem] lg:text-[10rem] xs:leading-[8rem] lg:leading-[10rem] tracking-tighter">
                <TranslatingTitle textArray={["State-of-the-Art Design"]} translateXPercentage={translateXPercentage} />
            </div>
    
            <div className="group mt-6 md:mt-[120px] pb-[160px] flex flex-col gap-20">
                <div id="state-of-art-carousel" className="overflow-hidden relative">
                    <motion.div style={{ x: mousePositionX, y: mousePositionY }} className="fixed w-max h-max top-0 left-0 z-10 translate pointer-events-none transition-transform ease-expo duration-200 scale-0">
                        <span className="hidden transition-transform -translate-y-1/2 -translate-x-1/2 ease-expo duration-300 scale-0 group-hover:scale-100 lg:flex z-10 text-white p-[6px] gap-3 items-center justify-center rounded-full backdrop-blur-md bg-white/20">
                            <span className="flex items-center justify-center w-6 aspect-square rounded-full bg-white/20">
                                <FaAngleLeft size={10} />
                            </span>
                            <span>Drag</span>
                            <span className="flex items-center justify-center w-6 aspect-square rounded-full bg-white/20">
                                <FaAngleRight size={10} />
                            </span>
                        </span>
                    </motion.div>
                    <motion.div 
                        drag="x" 
                        onUpdate={handleDrag}
                        dragConstraints={{ right: 0, left: carouselWidth }}
                        className="cursor-grab active:cursor-grabbing w-fit"
                    >
                        <ul className="w-fit pointer-events-none flex gap-4 px-4 xs:px-6 md:px-14 lg:px-20 pb-4 ">
                            {
                                CAROUSEL_VALUES.map(({ title, desc }, index) => (
                                    <li key={title} className="w-fit">
                                        <article className="flex flex-col gap-4 lg:gap-6 min-w-[240px] xs:min-w-[280px] sm:min-w-[320px] lg:min-w-[400px]">
                                            <span className="font-geist_mono text-base lg:text-lg">{index < 9 ? `0${index + 1}` : index + 1}.</span>
                                            <span className="relative w-full h-[160px] xs:h-[200px] lg:h-[280px]">
                                                <Image src={`/images/carousel${index + 1}.webp`} alt="" fill className="w-full h-full object-cover" />
                                            </span>
                                            <h4 className="mt-4 text-xl lg:text-2xl tracking-tight">{title}</h4>
                                            <p className="text-sm lg:text-lg leading-[1.2rem] lg:leading-[1.6rem]">{desc}</p>
                                        </article>
                                    </li>
                                ))
                            }
                        </ul>
                    </motion.div>
                </div>
                <div className="mt-0 sm:mt-10 px-4 xs:px-6 md:px-14 lg:px-20">
                    <span className="overflow-hidden float-right w-full md:max-w-[calc(100%_-_336px)] lg:max-w-[calc(100%_-_416px)] h-[1.5px] bg-white/30 block">
                        <motion.span style={{ scaleX: lineProgressScale }} className="origin-left block w-full h-full bg-[var(--text-color)]" />
                    </span>
                </div>
            </div>
        </section>
    )
}