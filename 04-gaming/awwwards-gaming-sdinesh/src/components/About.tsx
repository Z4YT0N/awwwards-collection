import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

// Register GSAP ScrollTrigger for scroll animations
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // --- SCROLL ANIMATION ---
  // Create animation that reveals full-screen image on scroll
  useGSAP(() => {
    // Timeline for clip path animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",          // Element that triggers animation
        start: "center center",    // Start when element is in center
        end: "+=800 center",       // End after scrolling 800px
        scrub: 0.5,               // Smooth animation with scroll
        pin: true,                // Pin element while animating
        pinSpacing: true,         // Maintain scroll space
      },
    });

    // Expand masked image to full screen
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    // --- LAYOUT STRUCTURE ---
    <div id="about" className="min-h-screen w-screen">
      {/* Welcome text and animated title */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Welcome text */}
        <p className="font-general text-xl uppercase md:text-[30px]">
          Welcome to Zentry
        </p>

        {/* Animated title with special formatting */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* Description text */}
        <div className="about-subtext">
          {/* The Game of Games begins—your life, now an epic MMORPG */}
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      {/* Image reveal section */}
      <div className="h-dvh w-screen" id="clip">
        {/* Masked image that expands on scroll */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;