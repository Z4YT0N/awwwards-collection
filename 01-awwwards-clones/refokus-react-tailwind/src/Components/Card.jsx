import { motion } from "framer-motion";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function Card({ width, start, para, hover = "false" }) {
  return (
    <motion.div
      whileHover={{backgroundColor: hover === "true" ? "#7443ff" : "#3E3E46", padding: "25px"}}
      className={`bg-zinc-800 p-5 rounded-xl  ${width} min-h-[30rem] flex flex-col justify-between transition-colors duration-300`}
    >
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          {start === false ? <h3 className="text-sm">Up Next: News</h3> : <h3 className="text-sm">Get In Touch</h3>}
          <IoIosArrowRoundForward size={"1.4rem"} />
        </div>
        {start === false ? <h1 className="text-3xl font-regular w-2/3 mt-5">Insights and behind the scenes</h1> : <h1 className="text-3xl font-regular w-[11vw] mt-5">Let's do it, together.</h1>}
      </div>
      <div className="down w-full">
        {start && (
          <>
            <h1 className="text-6xl font-semibold tracking-tight leading-none">
              Start Your Project
            </h1>
            <button className="rounded-full mt-5 py-2 px-5 border-[1px] border-zinc-50">
              Contact Us
            </button>
          </>
        )}
        {para && (
          <p className="text-sm text-zinc-300 font-regular">
            Explore what drives our team.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
