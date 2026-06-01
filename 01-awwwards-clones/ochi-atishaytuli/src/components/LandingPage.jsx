import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import { motion } from 'framer-motion';

function landingPage() {
    return (
        <div data-scroll data-scroll-section data-scroll-speed="-.4" className='w-full sm:h-screen sm:pt-1 pt-10 bg-zinc-100 text-zinc-900'>
            <div className="text sm:mt-32 mt-20 sm:p-16 px-5">
                {["We Create", "Eye-opening", "presentations"].map((item, index) => (
                    <div key={index} className="w-fit flex items-end overflow-hidden gap-2">
                        {index === 1 && (
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: "8.5vw" }} 
                                transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }} 
                                className='md:w-[8.5vw] sm:w-[25vw] md:h-[5.5vw] h-[14vw] rounded-xl overflow-hidden'>
                                <img 
                                    className='w-full h-full object-cover bg-center rounded-xl' 
                                    src="https://ochi.design/wp-content/uploads/2022/04/content-image01.jpg" 
                                    alt="" 
                                />
                            </motion.div>
                        )}
                        <motion.h1 
                            initial={{ y: "100%" }} 
                            animate={{ y: 0 }} 
                            transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }} 
                            className='font-[FG] uppercase md:text-[8.5vw] sm:text-[15vw] text-[15vw] md:leading-[6.5vw] sm:leading-[12vw] leading-[13vw] font-semibold'>
                            {item}
                        </motion.h1>
                    </div>
                ))}
            </div>

            <div className="two border-t-[1px] border-zinc-400 sm:mt-36 mt-80 flex flex-col sm:flex-row sm:justify-between justify-start sm:items-center items-start py-4 cursor-pointer sm:px-16 px-5 gap-8 mb-10 md:mb-0">
                {["For public and private companies", "From the first pitch to IPO"].map((item, index) => (
                    <p 
                        key={index} 
                        className='text-lg sm:text-xl font-normal tracking-tight leading-none'>
                        {item}
                    </p>
                ))}

                <div id='startProject' className="start flex gap-3 items-center group cursor-pointer">
                    <motion.div 
                        whileHover={{ backgroundColor: "#000", color: "#fff" }} 
                        className="px-5 py-1 border-[1px] rounded-full border-zinc-700 uppercase sm:text-xl text-lg font-medium transition duration-700">
                        Start the project
                    </motion.div>
                    <motion.div 
                        whileHover={{ backgroundColor: "#000", color: "#fff" }} 
                        className="text-xl p-2 rounded-full border-[1px] border-zinc-700 font-medium transition duration-700">
                        <MdArrowOutward />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default landingPage;
