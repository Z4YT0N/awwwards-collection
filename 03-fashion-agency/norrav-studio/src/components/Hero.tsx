"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const images = [
  "/imgs/img-1.png",
  "/imgs/img-2.png",
  "/imgs/img-3.png",
  "/imgs/img-4.jpeg",
  "/imgs/img-5.jpeg",
  "/imgs/img-6.jpeg",
  "/imgs/img-7.png",
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageIndex = useRef(0);
  const pRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters =
      containerRef.current.querySelectorAll<HTMLSpanElement>(".letter");

    const tl = gsap.timeline();

    letters.forEach((letterEl, index) => {
      const finalChar = letterEl.getAttribute("data-char") || "";

      tl.to(
        letterEl,
        {
          delay: 4.8,
          duration: 0.4,
          onStart: () => {
            let scrambleCount = 0;
            const interval = setInterval(() => {
              letterEl.textContent = chars.charAt(
                Math.floor(Math.random() * chars.length)
              );
              scrambleCount++;
              if (scrambleCount > 6) {
                clearInterval(interval);
                letterEl.textContent = finalChar;
              }
            }, 40);
          },
        },
        index * 0.08 + 0.5
      );
    });

    // after last letter animates → reveal paragraphs
    tl.to(
      pRefs.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      },
      "+=0.5" // wait a bit after last letter
    );
  }, []);

  // mouse trail effect (unchanged)
  useEffect(() => {
    if (!containerRef.current) return;

    let lastX = 0,
      lastY = 0;
    const threshold = 120;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) return;

      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;

      lastX = e.clientX;
      lastY = e.clientY;

      const rotation = dirX > 0 ? 12 : -12;
      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      const img = document.createElement("img");
      img.src = src;

      Object.assign(img.style, {
        position: "absolute",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: "280px",
        height: "auto",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        opacity: "0",
        objectFit: "cover",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
      });

      containerRef.current?.appendChild(img);

      gsap.fromTo(
        img,
        {
          scale: 0.6,
          opacity: 0,
          borderRadius: "50%",
          x: `-=${dirX * 80}`,
          y: `-=${dirY * 80}`,
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: 0,
          duration: 1.4,
          rotate: rotation,
          ease: "power3.out",
          x: `+=${dirX * 180}`,
          y: `+=${dirY * 180}`,
        }
      );

      gsap.to(img, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-[999] bg-black h-screen text-white flex flex-col items-center justify-center gap-4 md:gap-8 overflow-hidden"
    >
      {/* First block */}
      <div className="md:ml-[-10%] lg:ml-[-30%] flex flex-col-reverse md:flex-row gap-5 items-center">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden">
          {"NORRAV".split("").map((char, ci) => (
            <span
              key={ci}
              data-char={char}
              className="letter inline-block will-change-transform"
            >
              &nbsp;
            </span>
          ))}
        </h1>
        <p
          ref={(el) => {
            if (el && !pRefs.current.includes(el)) {
              pRefs.current.push(el);
            }
          }}
          className="hero-text underline opacity-0 translate-y-6"
        >
          we turn aesthetics into experience
        </p>
      </div>

      {/* Second block */}
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden">
        {"CREATIVE".split("").map((char, ci) => (
          <span
            key={ci}
            data-char={char}
            className="letter inline-block will-change-transform"
          >
            &nbsp;
          </span>
        ))}
      </h1>

      {/* Third block */}
      <div className="md:ml-[15%] lg:ml-[40%] flex flex-col-reverse md:flex-row items-center gap-5">
        <p
          ref={(el) => {
            if (el && !pRefs.current.includes(el)) {
              pRefs.current.push(el);
            }
          }}
          className="hero-text underline opacity-0 translate-y-6"
        >
          tech that’s light as air
        </p>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden">
          {"Studio".split("").map((char, ci) => (
            <span
              key={ci}
              data-char={char}
              className="letter inline-block will-change-transform"
            >
              &nbsp;
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
