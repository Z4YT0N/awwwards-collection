import React from "react";
import Stripe from "./Stripe";
import { motion } from "framer-motion";

function Stripes() {
  var data = [
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd7cf6b3689fb_css-design-awards-logos-id1L9L8Yvp%201.svg",
      number: 52,
    },
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63d6e83420934a94d642103b_NCC2021_LogoLockup%201.svg",
      number: 2,
    },
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd75d563689fd_Awwards-logotype-2018%201.svg",
      number: 15,
    },
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd7cf6b3689fb_css-design-awards-logos-id1L9L8Yvp%201.svg",
      number: 52,
    },
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63d6e83420934a94d642103b_NCC2021_LogoLockup%201.svg",
      number: 2,
    },
    {
      url: "https://cdn.prod.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd75d563689fd_Awwards-logotype-2018%201.svg",
      number: 15,
    },
  ];

  return (
    <div className="marquee-container flex items-center p-9 w-full h-[150px] overflow-hidden">
      <motion.div
        className="marquee flex flex-shrink-0 w-auto py-9"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {data.map((elem, index) => (
          <Stripe key={index} val={elem} />
        ))}
        {data.map((elem, index) => (
          <Stripe key={index + data.length} val={elem} />
        ))}
      </motion.div>
      <motion.div
        className="marquee flex flex-shrink-0 w-auto py-9"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {data.map((elem, index) => (
          <Stripe key={index} val={elem} />
        ))}
        {data.map((elem, index) => (
          <Stripe key={index + data.length} val={elem} />
        ))}
      </motion.div>
    </div>
  );
}

export default Stripes;
