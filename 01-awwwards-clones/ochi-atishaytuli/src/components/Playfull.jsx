import React, { useEffect, useState } from 'react';

function Playfull() {
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
    <div key={i} className='md:size-[14vw] size-[40vw] bg-white rounded-full grid items-center justify-center'>
      <div className='md:size-[8.5vw] size-[23vw] bg-black relative rounded-full flex items-center justify-center'>
        <span className='text-white font-medium md:text-[1.5vw] text-[4vw]'>PLAY</span>
        <div
          style={{
            transform: `translate(-50%, -50%) rotate(${rotateVal}deg)`,
          }}
          className='w-full absolute top-1/2 left-1/2'
        >
          <div className='md:size-[1.5vw] size-[6vw] top-0 right-0 bg-white rounded-full'></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='md:h-screen h-[40vh] w-full overflow-hidden'>
      <div data-scroll data-scroll-section data-scroll-speed="-.7" className='w-full h-full bg-playFullBg bg-center md:bg-cover bg-contain bg-no-repeat relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center justify-center gap-5'>
          {elements}
        </div>
      </div>
    </div>
  );
}

export default Playfull;
