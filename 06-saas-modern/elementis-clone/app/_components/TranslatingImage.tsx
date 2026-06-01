

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from "next/image";
import { useRef } from "react";

type Props = { 
    src: string; 
    alt: string; 
    containerClassName?: string; 
    imageClassName?: string; 
}

export default function TranslatingImage({ src, alt, containerClassName, imageClassName }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const translateY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <div ref={containerRef} className={`${containerClassName} w-full h-full overflow-hidden`}>
            <motion.div style={{ y: translateY }} className="relative w-full h-full">
                <Image 
                    src={src} 
                    alt={alt} 
                    width={1024}
                    height={1024}
                    className={`${imageClassName} absolute block top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-[120%] object-cover`} 
                />
            </motion.div>
        </div>
    )
}