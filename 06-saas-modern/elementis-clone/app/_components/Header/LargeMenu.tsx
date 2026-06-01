
import React, { useEffect, useRef, useState } from "react";
import { MotionValue, motion, animate } from 'framer-motion';

import Image from "next/image";

import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiTiktok, SiWhatsapp } from "react-icons/si";

import { v4 as generateId } from 'uuid';

import MenuButton from "./MenuButton";


type Props = {
    showMenu: boolean;
    toggleMenu: (val?: boolean) => void;
    mousePositionY: MotionValue<number>;
    clipPath: MotionValue<string>;
};

const IMAGES = [
    {
        title: "Home",
        image: "home.webp",
    },
    {
        title: "Destination",
        image: "destinations.webp",
    }, 
    {
        title: "Wellness",
        image: "wellness.webp"
    }, 
    {
        title: "Innovation",
        image: "innovation.webp"
    }, 
    {
        title: "Nature",
        image: "nature.webp"
    }, 
    {
        title: "Community",
        image: "community.webp"
    }, 
    {
        title: "The Story",
        image: "the-story.webp"
    }, 
    {
        title: "New Developments",
        image: "new-developments.webp"
    }, 
    {
        title: "Press Room",
        image: "press-room.webp"
    }, 
    {
        title: "Careers",
        image: "careers.webp"
    }
];

export default function LargeMenu({ clipPath, showMenu, toggleMenu, mousePositionY }: Props) {
    const images = useRef(IMAGES.map(({ title, image }) => ({ title, image: `/images/${image}`, id: generateId() })));

    const zIndex = useRef(1);
    const startingClipPath = useRef("");
    const [currentImageId, setCurrentImageId] = useState(`header-image-${IMAGES.length}`);

    const pickPictureToShow = async (index: number, mouseIsMovingUp: boolean) => {
        const id = `header-image-${index}`

        if(currentImageId === id) return;
        const pictureElement = document.getElementById(id);

        if(!pictureElement) return;

        startingClipPath.current = mouseIsMovingUp ? 'inset(0% 0% 100%)' : 'inset(100% 0% 0%)';

        images.current[index] = { ...images.current[index], id: generateId() };
        zIndex.current++;
        setCurrentImageId(id);
    }

    const handleMouseOver: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        if(!event.target) return;
        const element = event.target as HTMLButtonElement;
        const mouseIsMovingUp = event.clientY < mousePositionY.get();
        const classListToAdd = mouseIsMovingUp ? 'before:origin-bottom' : 'before:origin-top';
        const classListToRemove = mouseIsMovingUp ? 'before:origin-top' : 'before:origin-bottom';

        element.classList.add(classListToAdd);
        element.classList.remove(classListToRemove);
        
        const index = element.dataset.index;
        if (index) pickPictureToShow(Number(index), mouseIsMovingUp);
    };

    const handleMouseOut: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        if(!event.target) return;
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
        <div
            id="large_header_menu"
            className={`${showMenu ? '' : 'before:opacity-0 pointer-events-none'} md:block hidden absolute top-0 left-0 w-full h-screen before:absolute before:w-full before:h-full before:bg-black/30 before:transition-opacity before:duration-500 before:ease-in-out`}
        >
            <motion.div style={{ clipPath }} className="relative w-full h-full md:grid hidden grid-cols-[2fr_3fr] gap-20 bg-[var(--text-color)] text-[var(--main-color)] overflow-hidden">
                <picture 
                    className="relative overflow-hidden"
                >
                    {
                        images
                            .current
                            .map(({ id, image }, index) => (
                                <Image 
                                    fill 
                                    id={`header-image-${index}`}
                                    key={id}
                                    src={image} 
                                    alt="navigation image" 
                                    className="absolute top-0 left-0 w-full h-full object-cover" 
                                />
                            ))
                    }
                </picture>
                <div className="flex flex-col gap-4 pt-6 pb-10 pl-20 pr-16">
                    <div className="flex items-center justify-end">
                        <MenuButton showMenu={showMenu} toggleMenu={() => toggleMenu(false)} reverse />
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-8">
                        <h4 style={{ '--delay': `0ms` } as React.CSSProperties} className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-[200%] opacity-0 delay-1000 duration-0'} block transition-[transform,_opacity] ease-expo duration-1000 opacity-50 text-base font-light`}>Discover Page</h4>
                        <div className="flex flex-wrap">
                            <ul className="flex-1 flex flex-col gap-3">
                                {
                                    
                                    IMAGES.map(({ title, image }, index) => (
                                        index < 5 ?
                                            <li 
                                                key={image}
                                                style={{ '--delay': `${(index + 1) * 100}ms` } as React.CSSProperties}
                                                className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-[200%] opacity-0 delay-1000 duration-0'} block transition-[transform,_opacity] ease-expo duration-1000 w-fit`}
                                            >
                                                <a 
                                                    href="#"
                                                    onMouseOver={handleMouseOver}
                                                    onMouseOut={handleMouseOut}
                                                    data-index={index}
                                                    data-image-id={image} 
                                                    className="relative group/group-1"
                                                >
                                                    <span className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center group-hover/group-1:scale-100 scale-0 origin-bottom-left transition-transform duration-500 ease-expo">
                                                        <HiArrowUpRight size={24} />
                                                    </span>
                                                    <span className="group-hover/group-1:translate-x-[40px] transition-transform duration-500 ease-expo relative text-2xl font-light whitespace-nowrap pointer-events-none block">{title}</span>
                                                </a>
                                            </li> :
                                            null
                                    ))
                                }
                            </ul>
                            <ul className="flex-1 flex flex-col gap-3">
                                {
                                    IMAGES.map(({ title, image }, index) => (
                                        index >= 5 ?
                                            <li 
                                                key={image}
                                                style={{ '--delay': `${(index + 1) * 100}ms` } as React.CSSProperties}
                                                className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-[200%] opacity-0 delay-1000 duration-0'} block transition-[transform,_opacity] ease-expo duration-1000 w-fit`}
                                            >
                                                <a 
                                                    href="#"
                                                    onMouseOver={handleMouseOver}
                                                    onMouseOut={handleMouseOut}
                                                    data-index={index}
                                                    data-image-id={image} 
                                                    className="relative group/group-1"
                                                >
                                                    <span className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center group-hover/group-1:scale-100 scale-0 origin-bottom-left transition-transform duration-500 ease-expo">
                                                        <HiArrowUpRight size={24} />
                                                    </span>
                                                    <span className="group-hover/group-1:translate-x-[40px] transition-transform duration-500 ease-expo relative text-2xl font-light whitespace-nowrap pointer-events-none block">{title}</span>
                                                </a>
                                            </li> :
                                            null
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 style={{ '--delay': '700ms' } as React.CSSProperties} className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-full opacity-0 delay-1000 duration-0'} transition-[transform,_opacity] ease-expo duration-1000 block text-[var(--main-color)] opacity-50 text-base font-light`}>Contact Us</h4>
                            <div style={{ '--delay': '700ms' } as React.CSSProperties} className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-full opacity-0 delay-1000 duration-0'} transition-[transform,_opacity] ease-expo duration-1000 flex flex-wrap gap-6 items-center`}>
                                <a href="#" className="text-sm lg:text-base relative block before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--main-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                    <span>info@TRANSIRA.co</span>
                                </a>
                                <span>|</span>
                                <a href="#" className="text-sm lg:text-base relative block before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--main-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                    <span>+62 823 4078 1817</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 style={{ '--delay': '900ms' } as React.CSSProperties} className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-full opacity-0 delay-1000 duration-0'} block transition-[transform,_opacity] ease-expo duration-1000 text-[var(--main-color)] text-base`}>Stay Connected</h4>
                            <div className="flex flex-wrap gap-6 items-center">
                                {
                                [FiInstagram, FiFacebook, SiWhatsapp, SiTiktok, FiYoutube]
                                    .map((Icon, index) => (
                                        <a 
                                            href="#" 
                                            key={index} 
                                            style={{ 
                                                '--delay': `${(index + 9) * 100}ms` 
                                            } as React.CSSProperties} 
                                            className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-full opacity-0 delay-1000 duration-0'} group/group-link transition-[transform,_opacity] ease-expo duration-1000 flex items-center justify-center`}
                                        >
                                            <Icon size={20} className="group-hover/group-link:opacity-60 transition-opacity duration-600 ease-expo" />
                                        </a>
                                    ))
                                }
                            </div>
                        </div>

                        <a href="#" style={{ '--delay': '1000ms' } as React.CSSProperties} className={`${showMenu ? 'delay-[var(--delay)]' : 'translate-y-full opacity-0 delay-1000 duration-0'} transition-[transform,_opacity] ease-expo duration-1000 text-sm block`}>
                            <span className="w-fit relative block before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--main-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">Policies and Terms</span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}