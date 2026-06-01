"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate top footer content (emails, socials, etc.)
      tl.from(".footer-top > div, .footer-top a", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Animate big "Let's Talk" per letter
      tl.from(
        ".footer-title span",
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.05,
        },
        "-=0.3" // overlap slightly with socials animation
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={footerRef}
      className="relative z-[999] h-[90vh] sm:h-[70vh] md:h-[100vh] flex flex-col justify-between p-6 pt-10 pb-2 mt-16  bg-background"
    >
      {/* Top footer content */}
      <div className="md:w-7/10 mx-auto footer-top flex flex-col md:flex-row md:justify-between md:mt-10 gap-10 text-sm text-gray-600">
        <div>
          <p className="font-medium text-black">General Questions</p>
          <p>norravy@talk.in</p>
          <p className="mt-4 font-medium text-black">Business Enquiries</p>
          <p>norravy@bussiness.in</p>
        </div>

        <div>
          <p className="font-medium text-black">Socials</p>
          <ul className="space-y-1">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Tumblr</a>
            </li>
            <li>
              <a href="#">Behance</a>
            </li>
            <li>
              <a href="#">Dribbble</a>
            </li>
          </ul>
        </div>

        <div>
          <p>Psst Psst. Wanna get Spammn?</p>
          <a href="#" className="underline text-black font-semibold">
            Give me your mail
          </a>
        </div>
      </div>

      {/* Giant footer text */}
      <h2 className="footer-title text-[3.7rem] sm:text-[4.5rem] md:text-[18rem] font-semibold text-center text-black leading-none overflow-hidden">
        {"Let's Talk".split("").map((ch, idx) => (
          <span key={idx} className="inline-block overflow-hidden">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default Footer;
