import { motion, useTransform, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

type Props = { 
    textArray: string[]; 
    translateXPercentage?: MotionValue<string>; 
    textColor?: string; 
}

const REPEAT = [1, 2];

export default function TranslatingTitle ({ textArray, translateXPercentage, textColor }: Props) {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const containerTranslateX = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    
    return (
        <motion.div style={{ x: containerTranslateX }} className="font-open_sans relative h-[6rem] xs:h-[8rem] lg:h-[10rem] w-full">
            <div className='flex -translate-x-[10%]'>
                {
                    REPEAT.map((item, index) => (
                    <motion.div 
                        key={index}
                        style={{
                            x: translateXPercentage
                        }}
                        className="top-0 left-0 flex items-center"
                    >
                        <div className="flex items-center gap-2">
                            {
                                textArray.map((title, subIndex) => (
                                    <span key={subIndex} style={{ color: textColor }} className={`flex items-center justify-center`}>
                                        <span className="inline-block font-inter text-[2rem] xs:text-[4rem] lg:text-[6rem] leading-[2rem] xs:leading-[4rem] lg:leading-[6rem]">&nbsp;•&nbsp;</span>
                                        <span className="text-[6rem] tracking-tighter font-light whitespace-nowrap leading-[6rem] xs:text-[8rem] xs:leading-[8rem] lg:text-[10rem] lg:leading-[10rem]">{title}</span>
                                    </span>
                                ))
                            }
                        </div>
                    </motion.div>
                    ))
                }
            </div>
        </motion.div>
    )
}