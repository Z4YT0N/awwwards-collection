"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import WebGLText from "@/components/webgl/WebGLText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create(
    "hop",
    "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
  );
}

export default function Home() {
  const [counter, setCounter] = useState(0);
  const revealerRef    = useRef(null);
  const counterTextRef = useRef(null);
  const heroRef        = useRef(null);
  const imgRef         = useRef(null);

  useEffect(() => {
    let rafId;
    const counterEl = counterTextRef.current;
    const revealerEl = revealerRef.current;

    // 1 — animate counter INTO VIEW
    gsap.to(counterEl, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.4,
      onComplete: startCounting,
    });

    // 2 — count 0 → 100
    function startCounting() {
      const duration  = 2200;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-in-out curve
        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        setCounter(Math.floor(eased * 100));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCounter(100);
          // 3 — pause then exit counter + reveal page
          setTimeout(exitAndReveal, 350);
        }
      };

      rafId = requestAnimationFrame(tick);
    }

    // 3 — exit counter, slide revealer up, reveal hero
    function exitAndReveal() {
      gsap.to(counterEl, {
        y: -24,
        opacity: 0,
        duration: 0.55,
        ease: "power3.inOut",
      });

      gsap.to(revealerEl, {
        scaleY: 0,
        duration: 1.4,
        ease: "hop",
        delay: 0.1,
      });

      // clip-path reveal
      gsap.to(heroRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.8,
        ease: "hop",
        delay: 0.15,
      });

      // scale hero image in
      gsap.fromTo(
        imgRef.current,
        { scale: 1.35 },
        { scale: 1, duration: 2.4, ease: "power3.inOut", delay: 0.3 }
      );
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ── Dark revealer overlay ── */}
      <div ref={revealerRef} className="revealer" />

      {/* ── Loading counter ── */}
      <div className="counter-wrap">
        <span ref={counterTextRef} className="counter-text">
          {counter}
        </span>
      </div>

      {/* ── Main page ── */}
      <main className="home">
        <section ref={heroRef} className="hero-section">
          {/* WebGL "zajno" canvas */}
          <div className="webgl-hero">
            <WebGLText />
          </div>

          {/* Bottom hero image */}
          <div className="hero-img-wrap">
            <img
              ref={imgRef}
              src="/assets/hero-img-3.jpg"
              alt="Zajno hero"
              className="hero-img"
            />
          </div>

          {/* ® mark */}
          <span className="registered-mark">®</span>
        </section>
      </main>
    </>
  );
}
