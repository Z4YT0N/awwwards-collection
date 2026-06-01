import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroContent = () => {
    return (
        <div className="absolute bg-black/5 inset-0 flex items-center justify-between px-20 text-white">
            {/* Left Section */}
            <div className="flex-1 max-w-md">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[66px] leading-14 pt-16 pb-16 tracking-tight font-bold ">
                    We are<br />movement
                </h1>

                <div className="space-y-4">
                    <h2 className="text-base sm:text-lg leading-5">
                        Your<br />
                        freedom to<br />
                        enjoy life
                    </h2>

                    <p>——</p>

                    <p className="text-xs regular font-semibold leading-4 text-white max-w-[300px]">
                        Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
                    </p>
                </div>
            </div>

            {/* Middle Section - Airplane Window (your images go here) */}
            <div className="flex-1 flex items-center justify-center text-3xl cursor-pointer">
                <p>Jesko Jets</p>
            </div>

            {/* Right Section */}
            <div className="flex-1 max-w-md flex flex-col items-end">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold leading-14 text-right pt-52 pb-20">
                    We are<br />distinction
                </h1>

                <div className="flex flex-col items-end gap-6 mt-auto">
                    <div className="w-full h-px bg-white" />
                    <div className='flex items-center gap-20 justify-between'>
                        <button className="flex items-center gap-2 text-[9px] tracking-tight group">
                            <div className='flex flex-col'>
                                <ChevronDown size={16}/>
                                <ChevronDown size={16} className='-mt-[11px]'/>
                                <ChevronDown size={16} className='-mt-[11px]'/>
                            </div>
                            <span>SCROLL DOWN</span>
                        </button>
                        <button className="text-[9px] tracking-tight hover:opacity-80 transition-opacity">
                            TO START THE JOURNEY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;