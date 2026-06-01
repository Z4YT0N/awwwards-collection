"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const words = [
    "Welcome", // English
    "Bienvenido", // Spanish
    "Bienvenue", // French
    "Willkommen", // German
    "Benvenuto", // Italian
    "ようこそ", // Japanese
    "欢迎", // Chinese
    "Добро пожаловать", // Russian
    "स्वागत है", // Hindi (final one)
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [done, setDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index < words.length - 1) {
      const interval = setInterval(() => {
        setFade(false); // fade out
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setFade(true); // fade in new word
        }, 150);
      }, 300);

      return () => clearInterval(interval);
    } else {
      // Hindi reached → play exit animation
      const timeout = setTimeout(() => {
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            scale: 0.5,
            y: -200, // move upward
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => setDone(true), // remove after animation
          });
        }
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  if (done) return null; // fully unmount after animation

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] h-screen w-screen flex items-center justify-center bg-black text-white text-4xl font-bold"
    >
      <span
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {words[index]}
      </span>
    </div>
  );
};

export default Loader;
