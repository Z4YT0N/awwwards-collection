import { motion } from 'framer-motion'
import React from 'react'

const Marquee = () => {

  return (
    <div data-scroll data-scroll-section data-scroll-speed="0.1" className='w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-[#004D43]'>
        <div className="text border-t-2 border-b-2 border-zinc-400 flex whitespace-nowrap overflow-hidden">

            <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 10}} className='text-[22vw] leading-none font-["Founders Grotesk_X-Condensed"] font-semibold uppercase -mb-[1vw] pt-1 pr-20'>We are ochi</motion.h1>

            <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ repeat: Infinity, ease: "linear", duration: 10}} className='text-[22vw] leading-none font-["Founders Grotesk_X-Condensed"] font-semibold uppercase -mb-[4vw] pt-1 pr-20'>We are ochi</motion.h1>

            <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ repeat: Infinity, ease: "linear", duration: 10}} className='text-[22vw] leading-none font-["Founders Grotesk_X-Condensed"] font-semibold uppercase -mb-[2vw] pt-1 pr-20'>We are ochi</motion.h1>

 
        </div>
    </div>
  )
}

export default Marquee