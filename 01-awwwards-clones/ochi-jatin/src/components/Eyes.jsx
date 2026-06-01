import React, { useEffect, useState } from 'react'

const Eyes = () => {

    const [rotate, setRotate] = useState(0);

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            let mouseX = e.clientX;
            let mouseY = e.clientY;

            let deltaX = mouseX - window.innerWidth/2;
            let deltaY = mouseY - window.innerHeight/2;

            var angle = Math.atan2(deltaY, deltaX) * (180/Math.PI);
            setRotate(angle - 180)
        })
    });

  return (
    <div className='eyes w-full h-screen overflow-hidden'>
        <div data-scroll data-scroll-speed="-0.7" className='relative w-full h-full bg-cover bg-center bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg")]'>

            <div className="absolute flex gap-[5vw] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                {/* eye 1 */}
                <div className='flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100'>
                    <div className='relative w-[10vw] h-[10vw] rounded-full bg-zinc-900'>
                        <div style={{transform: `translate(-50%, -50%) rotate(${rotate}deg)`}} className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10">
                            <div  className='w-[2vw] h-[2vw] rounded-full bg-zinc-100'></div>
                        </div>
                    </div>
                </div>
                    
                {/* eye 2 */}
                <div className='flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100'>
                    <div className='relative w-[10vw] h-[10vw] rounded-full bg-zinc-900'>
                        <div style={{transform: `translate(-50%, -50%) rotate(${rotate}deg)`}} className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10">
                             <div  className='w-[2vw] h-[2vw] rounded-full bg-zinc-100'></div>
                        </div>
                   
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Eyes