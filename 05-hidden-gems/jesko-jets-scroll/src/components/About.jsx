import { Globe } from 'lucide-react'
import React from 'react'

const About = () => {
    return (
        <div className="relative w-full min-h-screen">
            {/* Content Container */}
            <div className="relative px-4 sm:px-20 pt-20 pb-10 sm:pb-0 flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between items-start">
                {/* Top Left - Logo and EST */}
                <div className='flex items-center gap-2 w-full lg:w-1/2'>
                    <Globe className="w-8 sm:w-10 h-8 sm:h-10 text-white" strokeWidth={1} />
                    <span className='italic text-white text-2xl sm:text-3xl'>Skyight</span>
                    <div className='flex flex-col pl-8'>
                        <p className='uppercase text-white text-[9px] tracking-tight'>by Evgeny Demidenko</p>
                        <p className='text-white text-[9px] tracking-tight'>2013</p>
                    </div>
                </div>

                {/* Content Grid - 2 rows, 2 columns */}
                <div className='grid grid-cols-2 gap-10 w-full lg:w-2/3 text-white pr-0 lg:pr-20'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-base sm:text-xl tracking-tight'>Direct Access to Private Travel</h1>
                        <span>——</span>
                        <p className='text-[10px]'>Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-base sm:text-xl tracking-tight'>Your Freedom to Enjoy your Life</h1>
                        <span>——</span>
                        <p className='text-[10px]'>We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise. Every journey is thoughtfully crafted to match your pace, priorities, and purpose.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-base sm:text-xl tracking-tight'>Precision and Excellence with us</h1>
                        <span>——</span>
                        <p className='text-[10px]'>Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-base sm:text-xl tracking-tight'>Global Reach, Personal Touch</h1>
                        <span>——</span>
                        <p className='text-[10px]'>With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About