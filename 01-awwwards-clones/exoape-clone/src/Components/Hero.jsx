import gsap, { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import Overflow from "./Overflow";

const Hero = () => {
  Overflow(".para p span");
  Overflow(".headings h1 span", 0.5);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".scroll-down", {
      scrollTrigger: {
        trigger: ".scroll-down",
        scroller: "body",
        start: "top 90%",
        end: "bottom 60%",
        scrub: true,
      },
      opacity: 0,
    });

    gsap.to(".picture img", {
      scrollTrigger: {
        trigger: ".picture img",
        scroller: "body",
        start: "0 0",
        end: "0 -300%",	
        scrub: true,
      },
      opacity: 0.5,
    })
  }, []);

  return (
    <div className="main relative w-full h-[150vh] sm:h-[270vh]">
      <span className="absolute scroll-down hidden sm:block z-[2] right-[10vh] top-[87vh] text-white text-lg font-semibold">
        Scroll to explore
      </span>
      <div className="picture w-full h-full overflow-hidden bg-black">
        <img
          data-scroll
          data-scroll-speed="-1"
          className="w-full h-full object-cover"
          src="https://a.storyblok.com/f/133769/1920x2716/5c24d6b467/exo-ape-hero-1.jpg/m/1920x2716/filters:format(webp):quality(70)"
          alt=""
        />
      </div>

      <div className="absolute w-full top-0 left-0">
        <div className="text text-white max-w-screen-3xl mx-auto h-full px-5 sm:px-32">
          <div className="para mt-72 sm:mt-[27rem]">
            {[
              " Global digital design studio partnering ",
              "with brands and businesses that create ",
              "exceptional experiences where people ",
              "live, work, and unwind. ",
            ].map((item) => (
              <p
                className="font-medium overflow-hidden text-lg sm:text-3xl leading-[2rem]"
                key={item}
              >
                <span className="block">{item}</span>
              </p>
            ))}
          </div>

          <div className="headings mt-5 sm:mt-12">
            {["Digital", "Design", "Experience"].map((item) => (
              <h1
                className="text-5xl overflow-hidden sm:text-[16rem] sm:tracking-tighter tracking-tight leading-[1.15]"
                key={item}
              >
                <span className="block">{item}</span>
              </h1>
            ))}
          </div>

          <div className="scroll-down mt-10 sm:hidden">
            <svg
              className="size-4 rotate-90"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div className="mt-20 sm:mt-32">
            <p className="font-medium text-lg sm:text-2xl sm:w-1/2 leading-[1.5rem]">
              We help experience-driven companies thrive by making their
              audience feel the refined intricacies of their brand and product
              in the digital space. Unforgettable journeys start with a click.
            </p>
            <div className="flex justify-between items-center mt-5 sm:mt-20">
              <a className="border-b sm:text-lg border-white inline-block" href="#" > The Studio </a>

              <div className="flex gap-32 max-md:hidden font-medium">
                <div className="space-y-3">
                  {["Work", "Studio", "News", "Contact"].map(item => {
                    return (
                      <a
                        key={item}
                        className="block text-md opacity-85 capitalize"
                        href="#"
                      >
                        {item}
                      </a>
                    );
                  })}
                </div>
                <div className="space-y-3">
                  {["atishaytuliiaf@gmail.com", "+44 007 1105 1012"].map(item => {
                    return (
                      <a key={item} className="block text-md opacity-85" href="#" > 
                      {item}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
