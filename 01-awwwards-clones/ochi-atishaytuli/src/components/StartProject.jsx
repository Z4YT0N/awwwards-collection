import React, { useEffect, useState } from 'react'
import { MdArrowOutward } from "react-icons/md";

function StartProject() {
    const [rotateVal, setRotateVal] = useState(0);
    useEffect(() => {
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
  
        const deltaX = mouseX - window.innerWidth / 2;
        const deltaY = mouseY - window.innerHeight / 2;
  
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
        setRotateVal(angle - 180);
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    const elements = Array.from({ length: 2 }).map((_, i) => (
      <div key={i} className='md:size-[14vw] size-[38vw] bg-white rounded-full grid items-center justify-center'>
        <div className='md:size-[8.5vw] size-[24vw] bg-black relative rounded-full'>
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${rotateVal}deg)`,
            }}
            className='w-full absolute top-1/2 left-1/2'
          >
            <div className='md:size-[1.5vw] size-[5vw] top-0 right-0 bg-white rounded-full'></div>
          </div>
        </div>
      </div>
    ));
  return (
    <div className='w-full md:h-screen h-[80vh] md:mt-0 mt-[10vh] bg-[rgb(205,234,104)] pt-20 relative'>
        <h1 className='text-zinc-900 font-[FG] font-extrabold md:text-[12.5vw] text-[22vw] uppercase md:leading-[10vw] leading-[16vw] text-center tracking-tight'>Ready</h1>
        <h1 className='text-zinc-900 font-[FG] font-extrabold md:text-[12.5vw] text-[22vw] uppercase md:leading-[10vw] leading-[16vw] text-center tracking-tight'>to start</h1>
        <h1 className='text-zinc-900 font-[FG] font-extrabold md:text-[12.5vw] text-[22vw] uppercase md:leading-[10vw] leading-[16vw] text-center tracking-tight'>the project?</h1>

        <div  data-scroll data-scroll-section data-scroll-speed=".6" className='absolute md:top-[40%] top-[85%] md:left-[35%] left-[10%] md:-translate-x-[50%] -translate-y-[70%] flex items-center justify-center gap-5'>
          {elements}
        </div>

        <div id='startProject' className='flex items-center justify-center gap-3 group mt-10'>
                <button className='px-4 py-1  text-2xl rounded-full border-2 border-zinc-600 uppercase tracking-tight font-semibold group-hover:bg-black group-hover:text-white transition duration-700 '>start the project</button>
                <div className='rounded-full border-2 border-zinc-600 p-2 text-2xl font-semibold group-hover:bg-black group-hover:text-white transition duration-700 '>
                    <MdArrowOutward />
                </div>
        </div>
    </div>     
  )
}

export default StartProject