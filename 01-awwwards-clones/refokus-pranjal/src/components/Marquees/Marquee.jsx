import { motion } from "motion/react"
import React from "react"

const Marquee = ({ imagesUrl, direction }) => {
  return (
    <div className='flex w-full overflow-hidden'>
      <motion.div
        initial={{ x: direction === "left" ? "0" : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : "0" }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className='flex flex-shrink-0 gap-20 py-8 pr-24'
      >
        {imagesUrl.map((url, index) => (
          <img key={index} src={url} className='w-[8vw]' />
        ))}
      </motion.div>

      <motion.div
        initial={{ x: direction === "left" ? "0" : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : "0" }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className='flex flex-shrink-0 gap-20 py-8 pr-24'
      >
        {imagesUrl.map((url, index) => (
          <img key={index} src={url} className='w-[8vw]' />
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
