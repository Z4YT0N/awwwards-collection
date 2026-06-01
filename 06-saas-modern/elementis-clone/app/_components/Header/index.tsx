

import { AnimationPlaybackControls, motion, animate, MotionValue, useMotionValue, useTransform, cubicBezier } from 'framer-motion';

import MenuButton from "./MenuButton";
import LargeMenu from "./LargeMenu";
import MobileMenu from "./MobileMenu";
import { useRef } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

type Props = {
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    showMenu: boolean;
    mousePositionY: MotionValue<number>;
    scrollY: MotionValue<number>;
    ref: React.RefObject<HTMLHeadElement | null>;
    childRef: React.RefObject<HTMLDivElement | null>;
};

const EASE = cubicBezier(.24, .43, .15, .97);
const EASE_REVERSED = cubicBezier(.97, .15, .43, .24);

const DURATION = 1;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

export default function Header({ setShowMenu, showMenu, scrollY, mousePositionY, ref, childRef }: Props) {
    const clipAnimationControls = useRef<AnimationPlaybackControls>(null);
    const clipProgress = useMotionValue(MAX_VALUE);

    const buttonAnimation = useRef<AnimationPlaybackControls>(null);

    const handleMouseOver = () => {
        const buttonSVG = document.getElementById("btn-path");

        if (!buttonSVG) return;

        buttonAnimation.current?.stop();
        buttonAnimation.current = animate(
            buttonSVG, 
            { pathLength: 1 }, 
            { 
                duration: 1, 
                ease: EASE,
                onComplete: () => buttonSVG.setAttribute('path-length', '0')
            }
        );
    };

    const handleMouseOut = () => {
        const buttonSVG = document.getElementById("btn-path");

        if (!buttonSVG) return;

        buttonAnimation.current?.stop();
        buttonAnimation.current = animate(
            buttonSVG, 
            { pathLength: 0 }, 
            { 
                duration: 1, 
                ease: EASE,
                onComplete: () => buttonSVG.setAttribute('path-length', '0')
            }
        );
    }

    const clipPath = useTransform(clipProgress, () => {
        const point1 = `0% ${showMenu ? clipProgress.get() : 0}%`;
        const point2 = `100% ${showMenu ? clipProgress.get() : 0}%`;
        const point3 = `100% ${showMenu ? 100 : 100 - clipProgress.get()}%`;
        const point4 = `0% ${showMenu ? 100 : 100 - clipProgress.get()}%`;

        return `polygon(${point1}, ${point2}, ${point3}, ${point4})`;
    });

    const toggleMenu = (val?: boolean) => {
        const body = document.getElementById('body');

        const newShowMenu = val ? val : !showMenu;
        setShowMenu(newShowMenu);
        animateLargeHeader(newShowMenu);

        if(newShowMenu) body?.classList.add('overflow-hidden');
        else body?.classList.remove('overflow-hidden');

        if(window.innerWidth >= 960) return;
        const changeHeaderColor = !newShowMenu && scrollY.get() < 160;

        const backgroundColor = changeHeaderColor ? 'transparent' : 'var(--text-color)';
        const textColor = changeHeaderColor ? 'var(--text-color)' : 'var(--main-color)';
        const borderColor = changeHeaderColor ? 'rgba(255, 255, 255, 0.2)': 'rgba(0, 0, 0, 0.2)';
    
        if(!ref.current) return;
        ref.current.style.setProperty('--background', backgroundColor);
        ref.current.style.setProperty('--text', textColor);
        ref.current.style.setProperty('--border', borderColor);

        if(!childRef.current) return;
        childRef.current.dataset.menu = newShowMenu ? 'showing' : 'not_showing';
    };

    const animateLargeHeader = (showMenu: boolean) => {
        clipAnimationControls.current?.stop();
        
        const start = clipProgress.get();
        const end = showMenu ? MIN_VALUE : MAX_VALUE;

        const duration = Math.abs((clipProgress.get() - end) / MAX_VALUE) * DURATION;

        clipAnimationControls.current = animate(clipProgress, [start, end], { 
            duration, 
            ease: EASE_REVERSED
        });
    }

    return (
        <header
            ref={ref}
            className="max-h-0 sticky top-0 z-10"
        >
            <div 
                ref={childRef}
                className="ease-expo duration-500 pt-2 md:pt-4 flex items-end relative z-[9999999] md:z-0 bg-[var(--background)] transition-[background-color,_transform] text-[var(--text)] max-w-[var(--max-width)] mx-auto my-0 px-4 xs:px-6 sm:px-10 lg:px-16 gap-10"
            >
                <div className="w-full h-[60px] md:h-[72px] flex items-center justify-between gap-10">
                    <span className="text-xl lg:text-2xl leading-[1rem] lg:leading-[1.2rem] font-light uppercase tracking-[.5rem] lg:tracking-[.7rem]">
                        {
                            "Transira".split("").map((letter, index) => (
                                <span key={index} className="inline-block overflow-hidden">
                                    <motion.span 
                                        initial={{ x: '-100%' }} 
                                        animate={{ x: '0%' }} 
                                        transition={{ duration: 1, ease: EASE, delay: 3.4 + (index / 25) }} 
                                        className="inline-block"
                                    >{letter}</motion.span>
                                </span>
                            ))
                        }
                    </span>
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-4">
                            {
                            ["Destinations", "Wellness", "Innovation", "Nature", "Community", "The Story"].map((title, index) => (
                                <li key={title} className="overflow-hidden">
                                    <motion.div 
                                        initial={{ y: '100%' }} 
                                        animate={{ y: '0%' }} 
                                        transition={{ duration: 1, ease: EASE, delay: 3.5 + (index / 25) }} 
                                        className="h-10 flex items-center justify-center"
                                    >
                                        <a href="#" className="block relative before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--text)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 before:origin-right hover:before:origin-left hover:before:scale-x-100">
                                            <span className="text-xs lg:text-base whitespace-nowrap">{title}</span>
                                        </a>
                                    </motion.div>
                                </li>
                            ))
                            }
                        </ul>
                    </nav>
                    <div className="flex gap-8 items-center">
                        <motion.button 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: EASE, delay: 3.64 }}
                            onMouseOver={handleMouseOver} 
                            onMouseOut={handleMouseOut} 
                            className="relative hidden md:flex items-center justify-center lg:w-[136px] h-10 lg:h-14 px-4 lg:px-0 border border-[var(--border)]"
                        >
                            <span className="flex items-center justify-center gap-2 md:gap-3 pointer-events-none">
                                <span className="text-sm lg:text-lg whitespace-nowrap">Join us</span>
                                <HiArrowUpRight size={18} />
                            </span>
                            <span className="block absolute top-0 left-0 w-full h-full">
                                <svg viewBox="0 0 136 57" xmlSpace="preserve" className="hidden md:block">
                                    <motion.path 
                                        id="btn-path"
                                        pathLength={0}
                                        transition={{ duration: 1, ease: EASE }} 
                                        className="stroke-[var(--text)]" 
                                        fill="none" 
                                        strokeWidth="1" 
                                        strokeMiterlimit="10" 
                                        opacity="1" 
                                        d="M0 56 H136 V0 H0 Z"
                                    ></motion.path>
                                </svg>
                            </span>
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: EASE, delay: 3.7 }}
                        >
                            <MenuButton showMenu={showMenu} toggleMenu={() => toggleMenu()} />
                        </motion.div>
                    </div>
                </div>
            </div>
            <LargeMenu clipPath={clipPath} mousePositionY={mousePositionY} showMenu={showMenu} toggleMenu={toggleMenu} />
            <MobileMenu showMenu={showMenu} />
        </header>
    )
}