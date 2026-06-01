"use client";

import React, { useEffect, useRef, useState } from "react";

import { useMotionValue, useScroll, useMotionValueEvent, animate, useTransform, AnimationPlaybackControls } from 'framer-motion';

import Hero from './_components/Hero';
import Header from './_components/Header';
import WoodSection from './_components/WoodSection';
import WhyChooseSection from "./_components/WhyChooseSection";
import StateOfArtDesignSection from "./_components/StateOfArtDesignSection";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";
import Lenis from "lenis";
import IntroSection from "./_components/IntroSection";
import IntroAnimation from "./_components/IntroAnimation";


const DURATION = 20;

export default function Home() {
  const isScrollingDown = useRef(false);
  const mustNotShowHeader = useRef(false);
  const headerContainerRef = useRef<HTMLHeadElement>(null);
  const headerChildRef = useRef<HTMLDivElement>(null);
  const titleAnimation = useRef<AnimationPlaybackControls>(null);

  const [showMenu, setShowMenu] = useState(false);

  const { scrollY } = useScroll();
  
  const mousePositionX = useMotionValue(0);
  const mousePositionY = useMotionValue(0);
  const mouseSpeedScale = useMotionValue(1);

  const translateX = useMotionValue(0);
  const translateXPercentage = useTransform(() => `${translateX.get() * -1}%`);

  const styleHeader = (changeHeaderColor?: boolean, hideHeader?: boolean) => {
    if (!headerContainerRef.current) return;

    const backgroundColor = changeHeaderColor ? 'var(--text-color)' : 'transparent';
    const textColor = changeHeaderColor ? 'var(--main-color)' : 'var(--text-color)';
    const borderColor = changeHeaderColor ? 'rgba(0, 0, 0, 0.2)': 'rgba(255, 255, 255, 0.2)';

    if (headerChildRef.current?.dataset?.menu === 'showing') return;
    headerContainerRef.current.style.setProperty('--background', backgroundColor);
    headerContainerRef.current.style.setProperty('--text', textColor);
    headerContainerRef.current.style.setProperty('--border', borderColor);

    if (!headerChildRef.current) return;
    if (hideHeader || mustNotShowHeader.current) {
      headerChildRef.current.classList.add('-translate-y-full');
      headerChildRef.current.classList.remove('md:-translate-y-4')
    } else if (!hideHeader && changeHeaderColor) {
      headerChildRef.current.classList.add('md:-translate-y-4');
      headerChildRef.current.classList.remove('-translate-y-full');
    } else {
      headerChildRef.current.classList.remove('md:-translate-y-4')
      headerChildRef.current.classList.remove('-translate-y-full');
    }
  }

  const animateTitle = (animationControls?: AnimationPlaybackControls | null, mustFinishAnimation?: boolean) => {
    let controls = animationControls;
    const start = isScrollingDown.current ? 100 : 0;
    const end = isScrollingDown.current ? 0 : 100;

    if(animationControls) animationControls.stop();

    if (mustFinishAnimation) {
        controls = animate(translateX, [translateX.get(), end], {
            ease: 'linear',
            duration: Math.abs(DURATION * ((translateX.get() - end) / (start - end))),
            onComplete: () => {
              titleAnimation.current = animateTitle();
            }
        });
    } else {
        controls = animate(translateX, [start, end], {
            ease: 'linear',
            duration: DURATION,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0
        });
    };

    return controls;
  };

  useMotionValueEvent(scrollY, "change", (value) => {
    if(!scrollY.getPrevious()) return;

    const windowIsScrollingDown = (value - Number(scrollY.getPrevious())) >= 1;
    isScrollingDown.current = windowIsScrollingDown;
    const hideHeader = value > 160 && isScrollingDown.current;
    const changeHeaderColor = value > 400;

    titleAnimation.current = animateTitle(titleAnimation.current, true);

    styleHeader(changeHeaderColor, hideHeader);
  });

  useEffect(() => {
    const handleWindowMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      mousePositionX.set(x);
      mousePositionY.set(y);

      if(mousePositionX.getPrevious() && mousePositionY.getPrevious()) {
        const scaleX = Math.pow(((window.innerWidth - Math.abs(x - Number(mousePositionX.getPrevious()))) / window.innerWidth), 10);
        const scaleY = Math.pow(((window.innerHeight - Math.abs(y - Number(mousePositionY.getPrevious()))) / window.innerHeight), 10);

        const scale = Math.min(scaleX, scaleY, 1);
        mouseSpeedScale.set(scale);
      }
    };

    window.addEventListener('mousemove', handleWindowMove);

    return () => window.removeEventListener('mousemove', handleWindowMove);
  }, [mousePositionX, mousePositionY]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    titleAnimation.current = animateTitle();
    styleHeader();
  }, []);
  
  return (
    <div
      className="bg-[var(--main-color)] min-h-screen text-[var(--text-color)]"
    >
      <IntroAnimation />
      <Header 
        ref={headerContainerRef}
        childRef={headerChildRef}
        scrollY={scrollY}
        setShowMenu={setShowMenu} 
        showMenu={showMenu} 
        mousePositionY={mousePositionY}
      />
      <div className="pb-3 xs:pb-5 px-4 md:px-10 lg:px-20 max-w-[var(--max-width)] fixed z-10 bottom-0 right-1/2 md:right-0 translate-x-1/2 md:translate-x-0">
          <p className="w-fit flex justify-center items-center gap-4 pt-1 lg:pt-3 pb-2 lg:pb-4 px-4 md:px-6 lg:px-10 bg-white/20 backdrop-blur-md text-sm md:text-base lg:text-xl">
              <span className="whitespace-nowrap">This website uses cookies.</span>
              <span className="block relative before:absolute before:top-[calc(100%_+_2px)] before:left-0 before:w-full before:border-b before:border-white/30">Okay.</span>
          </p>
      </div>
      <Hero 
        translateXPercentage={translateXPercentage}
        scrollY={scrollY}
        mousePositionX={mousePositionX} 
        mousePositionY={mousePositionY} 
        mouseSpeedScale={mouseSpeedScale} 
      />
      <IntroSection />
      <WoodSection 
        mousePositionY={mousePositionY} 
        translateXPercentage={translateXPercentage}
        isScrollingDown={isScrollingDown.current} 
      />
      <WhyChooseSection mustNotShowHeader={mustNotShowHeader} />
      <StateOfArtDesignSection 
        translateXPercentage={translateXPercentage}
        isScrollingDown={isScrollingDown.current} 
        mousePositionY={mousePositionY}
        mousePositionX={mousePositionX} 
      />
      <ContactSection />
      <Footer />
    </div>
  );
}