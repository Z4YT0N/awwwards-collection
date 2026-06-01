import React from 'react'

const About = () => {
  return (
    <div className='w-full p-[5vw] bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black'>
        <h1 className='font-["Neue_Montreal"] text-[4vw] leading-[4vw] tracking-tight'>Ochi is a strategic partner for fast-growing tech businesses that need to raise funds, sell products, exxplain complex ideas, and hire great people.</h1>

        <div className='flex gap-5 w-full border-t-[1px] pt-[3vw] border-[#99aa5d] mt-[4vw]'>
            <div className='w-1/2'>
                <h1 className='text-[5vw]'>Our Approach:</h1>
                <button className='flex gap-5 items-center px-[2vw] py-[1vw] bg-zinc-900 mt-[0.8vw] rounded-full text-white uppercase'>Read More
                <div className='w-2 h-2 bg-zinc-100 rounded-full'></div>
                </button>
            </div>

            <div className='w-1/2 h-[70vh] rounded-3xl'>
                <img className='h-[70vh]' src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default About