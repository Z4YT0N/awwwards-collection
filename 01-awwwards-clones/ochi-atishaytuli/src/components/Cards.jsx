import React, { useState } from 'react'

function Cards() {
    const packs = [
        {logo:"	https://ochi.design/wp-content/uploads/2022/04/logo001.svg",btn:"©2019-2020"},
        {logo:"https://ochi.design/wp-content/uploads/2022/04/logo002.svg",btn:"RATTING 5.0 ON CLUTCH"},
        {logo:"	https://ochi.design/wp-content/uploads/2022/04/logo003.png",btn:"BUISNESS BOOTCAMP ALUMINI"},
    ]

    const [pack, setPack] = useState(packs);
  return (
    <div  data-scroll data-scroll-section data-scroll-speed="-.2"  className='h-[90vh] md:h-[80vh] w-full md:grid md:grid-flow-col md:px-16 px-5 md:gap-5'>
        {pack.map((items,index)=>(
           <div key={index} className={`md:h-[53vh] h-[25vh] md:mt-32 mt-5 rounded-2xl px-6 md:py-3 py-5 ${index === 0? "md:w-[45vw] bg-emerald-800":"md:w-[22vw] bg-zinc-900"}`}>
                <div className='w-full h-[85%] grid place-items-center'>   
                    <img className='md:w-[8vw] w-[40vw] h-[10vh] rounded-xl' src={`${items.logo}`} alt="" />        
                </div>
                <button className='px-3 text-white py-2 border-2 border-gray-500 rounded-full md:text-sm text-xs'>{items.btn}</button>
            </div> 
        ))}
    </div>
  )
}

export default Cards