import React from 'react';
import { IoIosReturnRight } from "react-icons/io";
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#e2e2e2",
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
  tap: {
    scale: 0.95,
  },
};

const childVariants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -10, // Move up on hover
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

function Button({ title = "Get Started" }) {
  return (
    <motion.div
      className='w-40 px-4 py-2 bg-zinc-100 text-black rounded-full flex items-center justify-between cursor-pointer'
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div
        className='flex items-center'
        variants={childVariants}
      >
        <motion.span
          className='text-sm font-regular'
        >
          {title}
        </motion.span>
      </motion.div>
      <motion.div
        className='flex items-center'
        variants={childVariants}
      >
        <IoIosReturnRight />
      </motion.div>
    </motion.div>
  );
}

export default Button;
