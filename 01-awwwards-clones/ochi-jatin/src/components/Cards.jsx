import React from 'react'

const Cards = () => {
  return (
    <div data-scroll data-scroll-speed="0.4" className='w-full h-screen bg-zinc-100 flex items-center px-[5vw] gap-[3vw]'>

        <div className='cardcontainer w-1/2 h-[25vw]'>
            <div className="card relative rounded-xl w-full h-full bg-[#004D43] flex items-center justify-center">
                <img className='w-[10vw]' src="https://ochi.design/wp-content/uploads/2022/04/logo001.svg" alt="" />
                <button className='absolute left-[2vw] bottom-[2vw] px-[1vw] py-[0.5vw] border-2 rounded-full text-[#CDEA68] border-[#CDEA68]'>&copy;2024-2025</button>
            </div>
        </div>

        {/* 2nd card */}
        <div className='cardcontainer flex gap-[3vw] w-1/2 h-[25vw]'>
            <div className="card relative rounded-xl w-1/2 h-full bg-[#14332f] flex items-center justify-center">
            <img className='w-[10vw] -translate-y-[50%]' src="https://ochi.design/wp-content/uploads/2022/04/logo002.svg" alt="" />
            <button className='absolute left-[1vw] bottom-[1vw] px-[0.8vw] py-[0.3vw] border-[1px] rounded-full uppercase text-[1vw]'>Rating 5.0 on Clutch</button>
            </div>

            <div className="card relative rounded-xl w-1/2 h-full bg-[#14332f] flex items-center justify-center">
            <img className='w-[10vw] -translate-y-[40%]' src="https://ochi.design/wp-content/uploads/2022/04/logo003.png" alt="" />
            <button className='absolute left-[1vw] bottom-[1vw] px-[0.8vw] py-[0.3vw] border-[1px] rounded-full uppercase text-[1vw]'>Business Bootcamp Alumni</button>
            </div>
        </div>

    </div>
  )
}

export default Cards