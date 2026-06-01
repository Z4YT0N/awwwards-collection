'use client';
import { useRef } from 'react';
import Image from 'next/image';

import useFloatingImages from '@/composables/useFloatingImages';

import { useScroll, useTransform, motion } from 'framer-motion';

import { main_1, main_2, main_3 } from './images/index';

const Hero = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const { manageMouseMove } = useFloatingImages(ref1, ref2, ref3);

  const heading1 = useRef(null);
  const heading2 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heading1,
    offset: ['start 0.35', 'end 0.1'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="main" className="relative bg-gradient-to-b  ">
      <div
        onMouseMove={(e) => manageMouseMove(e)}
        className="relative left-0 top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden md:h-[80vh]"
      >
        <motion.h1
          ref={heading1}
          className="relative z-20 mt-[-5vw] w-full text-center text-[4.5vw] md:text-[6vw] md:leading-[1.2] font-extrabold text-text-1 max-w-[95%]"
          style={{ opacity }}
        >
          CREATING UNIQUENESS
        </motion.h1>
        <motion.h2 ref={heading2} className="z-20 text-[1.7vw] md:text-[3vw] font-medium text-text-1/7 5" style={{ opacity }} >
          Creative agency from USA, Tennessee
        </motion.h2>
        <div ref={ref1} className={`absolute left-0 top-0 z-10 h-full w-full`}>
          <Image src={main_1} fill={true} alt="" className='' objectFit="cover" />
        </div>

        <div ref={ref2} className={`absolute left-0 top-0 h-full w-full `}>
          <Image src={main_2} fill={true} alt="" objectFit="cover" />
        </div>

        <div ref={ref3} className={`absolute left-0 top-0 h-full w-full `}>
          <Image src={main_3} fill={true} alt="" objectFit="cover" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
