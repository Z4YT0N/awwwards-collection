import { motion } from "motion/react"
import React from "react"
import { IoIosArrowRoundForward } from "react-icons/io"

const Card = ({ width, start, para, hover, header, title }) => {
  return (
    <motion.div
      whileHover={{ padding: "25px " }}
      className={`bg-zinc-800 p-5 rounded-xl ${width} min-h-[30rem] flex flex-col justify-between ${
        hover ? "hover:bg-violet-500" : ""
      }`}
    >
      <div className='w-full'>
        <div className='w-full flex justify-between items-center'>
          <h3>{header}</h3>
          <IoIosArrowRoundForward />
        </div>
        <h1 className='text-3xl font-medium mt-5'>{title}</h1>
      </div>
      <div className='down w-full'>
        {start && (
          <>
            <h1 className='text-6xl font-semibold tracking-tight leading-none'>
              Start a Project
            </h1>
            <button className='rounded-full mt-5 py-2 px-5 border-[1px] border-zinc-50'>
              Contact Us
            </button>
          </>
        )}
        {para && (
          <p className='text-sm text-zinc-400 font-regular'>
            Explore what drives our team.
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default Card
