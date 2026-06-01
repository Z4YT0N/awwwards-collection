import { motion } from 'framer-motion';
import React from 'react';
import { FaLongArrowAltUp } from "react-icons/fa";


const LandingPage = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-0.4" className='w-full h-screen bg-zinc-900 pt-1'>

        <div className="textstructure mt-32 px-16">
            {["We Create", "Eye-Opening", "Presentations"].map((item, index) => {
                return <div key={index} className="masker ">
                    <div className='w-fit flex items-center overflow-hidden'>

                        {index === 1 && (<motion.div initial={{width: 0}} animate={{width: "9vw"}} transition={{ease: [0.76, 0, 0.24, 1], duration: 1}}  className='w-[9vw] h-[5.5vw] bg-red-600 
                         mt-3 relative rounded-md mr-[1vw]'></motion.div>)}

                    <h1 className='uppercase text-[8.5vw] leading-[7vw] tracking-tighter font-["Founders_Grotesk] font-medium'>{item}</h1>
                    </div>
                    </div>
            })}
        </div>

        <div className='border-t-[1px] border-zinc-800 mt-[6vw] flex justify-between items-center py-5 px-20'>
            {["For public and private companies", "From the first pitch to IPO"].map((item, index) => (
                <p key={index} className='text-md font-light tracking-tight leading-none'>{item}</p>
            ))}
            <div className='start flex items-center gap-4'>
                <div className='px-5 py-2 border-[2px] rounded-full border-zinc-500 font-light text-md uppercase cursor-pointer'>Start the project</div>
                <div className='w-10 h-10 rounded-full border-[2px] border-zinc-500 flex items-center justify-center'> 
                <span className='rotate-[45deg]'><FaLongArrowAltUp /></span></div>
            </div>

        </div>
    </div>
  )
}

export default LandingPage
