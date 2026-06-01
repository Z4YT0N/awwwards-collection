"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import Image from "next/image";

const Nav = () => {
  const navItems = [
    {
      id: 1,
      title: "Home",
      img: "/img-1.jpeg", // replace with actual path
      link: "#home",
    },
    {
      id: 2,
      title: "Studios",
      img: "/img-2.jpeg",
      link: "#about",
    },
    {
      id: 3,
      title: "Recongnition",
      img: "/img-3.jpeg",
      link: "#projects",
    },
    {
      id: 4,
      title: "Work",
      img: "/img-4.jpeg",
      link: "#contact",
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const activeUser = useUserActivity();
  return (
    <div>
      <div
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        onClick={() => setOpen(!open)}
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-[995] h-12 w-full max-w-xs md:max-w-xl rounded-2xl bg-black text-white px-3 flex  items-center  ${
          open ? "justify-end z-[1005]" : "justify-between z-[995]"
        }  cursor-pointer `}
      >
        <div className={` ${open ? "hidden" : "flex"} gap-3 `}>
          {/* logo  */}
          <div className="relative overflow-hidden flex items-center justify-center">
            <motion.img
              src="/scisor.svg"
              alt=""
              animate={!activeUser && !mouseHover ? { y: "100%" } : { y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute bottom-full left-0   "
            />
            <motion.img
              src="/arrow-up.svg"
              alt=""
              animate={mouseHover && activeUser ? { y: "100%" } : { y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute bottom-full left-0 scale-125  "
            />
            <motion.img
              src="/logo.svg"
              alt=""
              animate={!mouseHover && activeUser ? { y: 0 } : { y: "130%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="size-5"
            />
          </div>
          {/* text section  */}
          <motion.div className="relative md:w-[300px] overflow-hidden h-6">
            {/* Default */}
            <motion.div
              animate={!mouseHover && activeUser ? { y: 0 } : { y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            >
              We are Norrav
            </motion.div>

            {/* Open Menu */}
            <motion.div
              animate={mouseHover && activeUser ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-0 left-0"
            >
              Open Menu
            </motion.div>

            {/* Welcome Back */}
            <motion.div
              animate={!activeUser ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-0 left-0"
            >
              Welcome Back Champ
            </motion.div>
          </motion.div>
        </div>

        {/* close btn and current page section  */}
        <div className="flex items-center gap-3">
          <button
            className={`${
              open ? "hidden" : "block"
            }  bg-background text-black px-3 py-1 rounded-xl `}
          >
            {open ? "open" : "close"}
          </button>{" "}
          <div className="relative w-6 h-6 cursor-pointer">
            {/* Horizontal line */}
            <div
              className={`absolute top-1/2 left-0 h-0.5 w-full bg-white rounded transition-transform duration-300 ${
                open ? "-rotate-90 scale-x-0" : "rotate-0 scale-x-100"
              }`}
            />
            {/* Vertical line */}
            <div
              className={`absolute top-1/2 left-1/2 h-0.5 w-full bg-white rounded transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                open ? "rotate-0 " : "rotate-90  "
              }`}
            />
          </div>
        </div>
      </div>

      {/* content  */}
      <motion.div
        animate={
          open
            ? { maxHeight: 480, zIndex: "1000" }
            : { maxHeight: 50, zIndex: "990" }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 h-[480px] z-[990] w-full max-w-xs md:max-w-xl rounded-2xl bg-black text-white flex flex-col items-start cursor-pointer py-6 px-8 overflow-hidden"
      >
        <div className="w-full flex justify-between items-center ">
          <h2 className="text-xl md:text-2xl ">We Are Norrav</h2>{" "}
          <button className={` bg-background text-black px-3 py-1 rounded-xl `}>
            Let&apos;s talk
          </button>
        </div>
        <ul className="w-full mt-5  ">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="h-20 w-full flex items-center gap-4 p-4 border-b border-stone-800 group"
            >
              <div className="h-16 overflow-hidden">
                <Image
                  src={item.img}
                  alt=""
                  height={64}
                  width={64}
                  className="w-full h-full object-contain group-hover:scale-125  transform-all ease-in-out duration-300"
                />
              </div>
              <h2 className="text-2xl group-hover:translate-x-4 transform-all ease-in-out duration-300">
                {item.title}
              </h2>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Nav;
