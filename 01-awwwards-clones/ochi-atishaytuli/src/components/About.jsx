import React from 'react'

function About() {
  return (
    <div className='w-full md:rounded-t-3xl rounded-b-[1rem] overflow-hidden bg-[#CDEA68] py-10 md:py-30 px-4 md:px-16'>
        <h2 className='text-[8vw] md:text-[3.5vw] leading-none font-normal font-[NM] w-full md:w-[85%] py-16 md:py-32 text-zinc-900'>
            Ochi is a strategic presentation agency for forward-thinking businesses that need to <span>raise funds</span>, 
            <span className='underline'> sell products</span>, 
            <span className='underline'> explain complex ideas</span>, and 
            <span className='underline'> hire great peo- ple</span>.
        </h2>

        <div className='w-full md:w-[100vw] -mx-4 md:-mx-16 border-t-[1px] border-gray-600 mt-10 md:mt-20'></div>
        <div className='flex flex-col md:flex-row gap-8 md:gap-5 mt-4 mb-20 md:mb-36 justify-between w-full'>
            <h4 className='text-xl md:text-[1.1vw] w-full md:w-[80%]'>What you can expect:</h4>
            <div className='w-full md:w-auto'>
                <p className='text-base md:text-[1.1vw] md:w-[50%]'>We create tailored presentations to help you persuade your colleagues, clients, or investors. Whether it's live or digital, delivered for one or a hundred people.</p>
                <p className='text-base md:text-[1.1vw] md:w-[50%] mt-5'>We believe the mix of strategy and design (with a bit of coffee) is what makes your message clear, convincing, and captivating.</p>
            </div>
            <div className='underline mt-8 md:mt-auto md:mr-11'>
                <p className='text-base md:text-[1.1vw]'>S :</p>
                <br />
                <p className='text-base md:text-[1.1vw]'>Instagram</p>
                <p className='text-base md:text-[1.1vw]'>Behance</p>
                <p className='text-base md:text-[1.1vw]'>FaceBook</p>
                <p className='text-base md:text-[1.1vw]'>LinkedIn</p>
            </div>
        </div>

        <div className='w-full md:w-[100vw] -mx-4 md:-mx-16 border-t-[1px] border-gray-600 mt-10 md:mt-20'></div>
        <div className='flex flex-col md:flex-row gap-8 md:gap-5 items-start justify-between w-full pt-4'>
            <div className='w-full md:w-1/2'>
                <h1 className='text-4xl md:text-[3vw] font-semibold tracking-tight'>Our approach:</h1>
                <button className='mt-4 md:w-42 mt-3 px-7 py-4 rounded-full bg-zinc-900 text-white flex items-center justify-center md:justify-start gap-3'>
                    READ MORE
                    <div className='size-1 bg-white rounded-full'></div>
                </button>
            </div>
            <div style={{ backgroundImage: "url('https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg')" }} className='w-full md:w-1/2 h-[40vh] md:h-[55vh] rounded-xl md:rounded-3xl bg-center bg-cover'>
            </div>
        </div>

    </div>
  )
}

export default About
