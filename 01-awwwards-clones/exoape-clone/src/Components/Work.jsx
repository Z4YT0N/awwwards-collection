import { motion } from "framer-motion";
import { Power4 } from "gsap/all";
import React, { useRef, useState } from "react";

const Work = () => {
  const elems = [
    {
      heading: "Studio D",
      subHeading: "Urban and Landscape Design",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/914798702/rendition/720p/file.mp4?loc=external&log_user=0&signature=b76cb0994de6beca7f6ba29e7eb52db1750d34600352dab2566c6ca16fcd817f",
      image:
        "https://a.storyblok.com/f/133769/2409x3000/b5ccf4619b/studio-d-hero.jpg/m/1300x1619/filters:format(webp):quality(70)",
    },
    {
      heading: "Rino & Pelle",
      subHeading: "Effortless chic lifestyle",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/914798484/rendition/720p/file.mp4?loc=external&log_user=0&signature=666d8099e0f1361eb1766ec0592b63a9bdf2b303cdb12ddfa5789d20ce8f523b",
      image:
        "https://a.storyblok.com/f/133769/2500x3113/78edf86efd/rino-pelle-hero.jpg/m/1300x1619/filters:format(webp):quality(70)",
    },
    {
      heading: "Aebele Interiors",
      subHeading: "Luxurious design experience",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/914796979/rendition/540p/file.mp4?loc=external&log_user=0&signature=57ac30ff6fc3b29802f7414617e808395306f0b0fa5c9c6e3ef483a532f49c15",
      image:
        "https://a.storyblok.com/f/133769/1606x2000/09a30057bd/aebele-interiors-hero.jpg/m/1300x1619/filters:format(webp):quality(70)",
    },
    {
      heading: "Pixelflakes",
      subHeading: "Architectural marketing agency",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/914798271/rendition/720p/file.mp4?loc=external&log_user=0&signature=2af493277d050009920c26416a8d62a9a8c316353242c609ee157fcf1e300076",
      image:
        "https://a.storyblok.com/f/133769/2880x3588/5c50befb8e/pixel-flakes-hero.jpg/m/1300x1620/filters:format(webp):quality(70)",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 sm:px-52 py-20">
      <div className="featured flex items-center gap-3">
        <svg
          className="size-3 sm:size-7"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
            fill="currentColor"
          ></path>
        </svg>
        <h2 className="capitalize font-semibold text-sm sm:text-3xl">
          featured projects
        </h2>
      </div>

      <h2 className="text-7xl sm:text-[14rem] tracking-tight my-5 overflow-hidden">
        <motion.span
          initial={{ y: "90%", rotate: 30 }}
          whileInView={{ y: "0", rotate: 0 }}
          viewport={{ once: true }}
          transition={{ ease: Power4.inOut, duration: 0.5 }}
          className="inline-block origin-left"
        >
          Work
        </motion.span>
      </h2>
      <p className="text-lg leading-[1.5rem] sm:text-xl sm:w-2/3 sm:opacity-40">
        Highlights of cases that we passionately built with forward-thinking
        clients and friends over the years.
      </p>

      <div className="elems w-full mt-8 sm:flex sm:flex-wrap sm:justify-between">
        {elems.map((item) => (
          <div
            key={item.heading}
            className="elem w-full sm:w-[48%] overflow-hidden mb-10"
          >
            <div className="video relative w-full h-[104vw] sm:h-[40vw] overflow-hidden">
              <motion.img
                whileHover={{ opacity: 0 }}
                transition={{ ease: "linear", duration: 0.1 }}
                data-scroll
                data-scroll-speed="-0.2"
                className="absolute max-sm:hidden z-[2] w-full h-full object-cover"
                src={item.image}
              />
              <motion.video
                data-scroll
                data-scroll-speed="-0.2"
                className="w-full h-full object-cover"
                src={item.video}
                autoPlay
                muted
                loop
              ></motion.video>
            </div>

            <div className="description mt-3 sm:flex sm:items-center sm:gap-1">
              <h1 className="capitalize font-medium sm:text-sm">
                {item.heading}
              </h1>
              <p className="hidden sm:block font-extrabold">–</p>
              <p className="capitalize text-sm opacity-60 sm:opacity-80 sm:text-xs">
                {item.subHeading}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
