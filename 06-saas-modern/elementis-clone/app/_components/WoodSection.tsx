
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue, animate } from 'framer-motion';

import { CiMenuBurger } from "react-icons/ci";

import TranslatingTitle from "./TranslatingTitle";

import { v4 as generateId } from 'uuid';

type Props = {
    isScrollingDown: boolean;
    mousePositionY: MotionValue<number>;
    translateXPercentage: MotionValue<string>;
};

const IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function WoodSection ({ translateXPercentage, mousePositionY }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const images = useRef(IMAGES.map(() => generateId()));
    const zIndex = useRef(1);
    const startingClipPath = useRef("");
    const [currentImageId, setCurrentImageId] = useState(`list-picture-${IMAGES.length}`);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

    const pickPictureToShow = async (index: number, mouseIsMovingUp: boolean) => {
        const id = `list-picture-${index}`;
        if(currentImageId === id) return;
        const pictureElement = document.getElementById(id);

        if(!pictureElement) return;

        startingClipPath.current = mouseIsMovingUp ? 'inset(0% 0% 100%)' : 'inset(100% 0% 0%)';

        images.current[index] = generateId();
        zIndex.current++;
        setCurrentImageId(id);
    }

    const handleMouseOver: React.MouseEventHandler<HTMLLIElement> = (event) => {
        if(!event.target || window.innerWidth < 960) return;
        const element = event.target as HTMLButtonElement;
        const mouseIsMovingUp = event.clientY < mousePositionY.get();
        const classListToAdd = mouseIsMovingUp ? 'before:origin-bottom' : 'before:origin-top';
        const classListToRemove = mouseIsMovingUp ? 'before:origin-top' : 'before:origin-bottom';

        element.classList.add(classListToAdd);
        element.classList.remove(classListToRemove);
        
        const index = element.dataset.index;
        if (index) pickPictureToShow(Number(index), mouseIsMovingUp);
    };

    const handleMouseOut: React.MouseEventHandler<HTMLLIElement> = (event) => {
        if(!event.target || window.innerWidth < 960) return;
        const element = event.target as HTMLButtonElement;
        const mouseIsMovingUp = event.clientY < mousePositionY.get();
        const classListToAdd = mouseIsMovingUp ? 'before:origin-top' : 'before:origin-bottom';
        const classListToRemove = mouseIsMovingUp ? 'before:origin-bottom' : 'before:origin-top';

        element.classList.add(classListToAdd);
        element.classList.remove(classListToRemove);
    };

    useEffect(() => {
        const pictureElement = document.getElementById(currentImageId);
        if(!pictureElement) return;

        pictureElement.style.zIndex =  String(zIndex.current);

        const styling = { 
            transform: ['scale(1.5)', 'scale(1)'], 
            clipPath: [startingClipPath.current, 'inset(0%)'] 
        };
        
        animate(pictureElement, styling, { 
            duration: 1, 
            ease: [.24, .43, .15, .97]
        });

    }, [zIndex, startingClipPath, currentImageId]);


    return (
        <section className="mt-[120px] md:mt-[160px] pb-10 sm:pb-[120px] min-h-screen text-[var(--main-color)] bg-[var(--text-color)]">
            <div className="font-open_sans pt-[100px] xs:pt-[120px] md:pt-[240px] overflow-x-clip flex items-center">
                <TranslatingTitle textArray={["Exceptional Wood Construction"]} translateXPercentage={translateXPercentage} />
            </div>
            <div className="md:mt-10 px-0 sm:px-6 md:px-10 lg:px-20 py-20 max-w-[var(--max-width)]">
                <div className="px-4 xs:px-6 sm:px-0 items-start grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-20">
                    <div className="mt-2 flex items-center gap-6 text-base lg:text-xl">
                        <CiMenuBurger size={20} />
                        <h2 className="font-normal">Exceptional wood construction</h2>
                    </div>
                    <div>
                        <p className="text-base leading-[1.3rem] lg:text-xl lg:leading-[1.6rem] max-w-[48ch] pt-2 ">
                        We prioritize the use of high-quality glue laminated <br className="hidden sm:block" />
                        timber that is uniquely suited for tropical climate <br className="hidden sm:block" />
                        construction, offering several unparalleled benefits:
                        </p>
                    </div>
                </div>
                
                <div ref={containerRef} className="mt-10 md:mt-20 items-start grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-20">
                    <div className="px-4 xs:px-6 sm:px-0 flex items-end justify-start h-full">
                        <div className="sticky bottom-6 w-full overflow-hidden aspect-[0.9] xs:aspect-[0.8] sm:aspect-video md:w-[320px] md:aspect-[0.8]">
                            <motion.picture style={{ scale: imageScale }} className="relative w-full h-full block">
                                {
                                    images.current.map((id, index) => (
                                        <Image 
                                            fill
                                            key={id}
                                            id={`list-picture-${index}`}
                                            alt={`image of something ${index + 1}`}
                                            src={`/images/exceptional-wood${index + 1}.webp`} 
                                            className="list-picture block absolute top-0 left-0 w-full h-full ease-expo duration-1000" 
                                        />
                                    ))
                                }
                            </motion.picture>
                        </div>
                    </div>
                    <div>
                        <ul className="flex flex-col border-t border-[var(--main-color-light)]">
                        {
                            ["Pure natural material", "Premium surface quality", "Maximum fire resistance", "Highest wind resistance", "High seismic resistance", "Maximum moisture resistance", "Natural protection against harmful fungi", "Eco and enviromentally friendly", "Perfect finishing and aesthetics"]
                            .map((title, index) => (
                                <li 
                                    key={index} 
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    data-index={index}
                                    className={` group relative hover:text-[var(--text-color)] before:origin-top before:pointer-events-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[var(--main-color)] before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-[500ms] before:ease-expo overflow-hidden`}
                                >
                                    <span className="z-[1] pointer-events-none relative py-2 sm:py-0 h-14 sm:h-20 flex justify-between items-center gap-4 border-b border-[var(--main-color-light)] px-4 xs:pl-6 sm:pl-0 xs:pr-6">
                                        <span className="group-hover:translate-x-4 ease-expo block text-base sm:text-lg lg:text-2xl transition-transform duration-500">
                                            <span className="transition-[color] duration-200">{title}</span>
                                        </span>
                                        <span className="text-sm xs:text-base lg:text-lg font-geist_mono transition-[color] duration-200">{index < 9 ? `0${index + 1}` : index + 1}</span>
                                    </span>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
                <div className="mt-10 sm:mt-20 px-4 xs:px-6 sm:px-0 items-start grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-20">
                    <span className="hidden md:block"></span>
                    <div className="pt-4">
                        <p className="text-sm leading-[1.4rem] lg:text-lg lg:leading-[1.6rem] max-w-[56ch]">
                        Our high-quality glue laminated timber revolutionizes tropical climate <br className="hidden sm:inline-block"  />
                        construction by seamlessly combining natural elegance, unparalleled <br className="hidden sm:inline-block" /> 
                        durability, and environmental responsibility. This premium material <br className="hidden sm:inline-block" /> 
                        offers maximum resistance to fire, wind, moisture, and seismic activity, <br className="hidden sm:inline-block" />
                        while naturally protecting against harmful fungi. Its exceptional surface <br className="hidden sm:inline-block" />
                        quality and eco-friendliness make it an excellent choice for <br className="hidden sm:inline-block" />
                        sustainable and resilient architecture, setting a new benchmark for <br className="hidden sm:inline-block" />
                        both aesthetics and performance in tropical environments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}