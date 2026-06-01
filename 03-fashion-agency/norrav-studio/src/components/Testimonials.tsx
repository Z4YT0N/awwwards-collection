"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    company: "/company/ibm.svg",
    quote:
      "I needed a creative agency at the top of design thinking and leading-edge in technical capabilities. Bürocratik was a perfect match, they are a very rare kind of agency, one that treats clients with respect while bringing their best thinking and work to meet business needs. Outstanding creative digital work!",
    name: "Sophia Martinez",
    role: "Global Brand Director, IBM",
  },
  {
    company: "/company/delta.svg",
    quote:
      "We needed a partner who understood both innovation and execution, and that’s exactly what we found. The team translated complex challenges into clear solutions, blending creativity with precision. They didn’t just deliver design — they built experiences that continue to resonate deeply with our customers worldwide.",
    name: "James Carter",
    role: "VP of Customer Experience, Delta",
  },
  {
    company: "/company/unileaver.svg",
    quote:
      "They’re not just a creative agency — they’re genuine collaborators. Every project felt like a partnership where vision and detail came together seamlessly. Their ability to balance strategic thinking with bold creativity set a new benchmark for us, raising expectations across our global brand teams.",
    name: "Mandlina Covachiu",
    role: "Global Brand Manager, Unilever",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Animate heading
    gsap.from(".Testimonials span", {
      y: "100%",
      duration: 0.6,
      stagger: 0.05,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      },
    });

    // Horizontal scroll
    const slider = sliderRef.current;
    const sections = slider.querySelectorAll(
      ".testimonial"
    ) as NodeListOf<HTMLElement>;

    let totalWidth = 0;
    sections.forEach((section) => {
      totalWidth += section.offsetWidth;
    });
    totalWidth -= containerRef.current.offsetWidth;

    gsap.to(slider, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + totalWidth,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={containerRef} className="relative p-6">
      {/* heading */}
      <div className=" flex flex-col md:flex-row gap-5 md:gap-20 mb-10 p-2">
        <h2 className="text-3xl max-w-[950px] overflow-hidden Testimonials">
          <span className="block">Testimonials</span>
        </h2>
        <p className="max-w-[280px] md:max-w-sm text-sm leading-[1] text-gray-600">
          {"Paper doesn't crash, and websites don't crease and tear, but receiving such positive testimonials after long processes always tugs at our heartstrings."
            .split(" ")
            .map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-1">
                <span className="block">{word}</span>
              </span>
            ))}
        </p>
      </div>

      {/* horizontal track */}
      <div className="overflow-hidden">
        <div ref={sliderRef} className="flex h-[80vh]">
          {testimonials.map((review, idx) => (
            <div
              key={idx}
              className="testimonial shrink-0 w-screen md:w-[60vw] flex flex-col justify-center p-2 md:p-8"
            >
              <Image
                src={review.company}
                alt=""
                width={64}
                height={64}
                className="size-16 mb-6"
              />
              <p className="text-lg sm:text-xl md:text-3xl font-medium leading-snug mb-6  pr-4 sm:pr-16">
                “{review.quote}”
              </p>
              <div className="text-lg">
                <h2 className="font-semibold">{review.name}</h2>
                <h4 className="text-gray-500">{review.role}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
