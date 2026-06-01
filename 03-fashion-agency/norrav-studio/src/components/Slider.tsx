"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const images = [
  "/dev/p-1.jpeg",
  "/dev/p-2.jpeg",
  "/dev/p-3.jpeg",
  "/dev/p-4.jpeg",
  "/dev/p-5.jpeg",
  "/dev/p-1.jpeg",
  "/dev/p-2.jpeg",
];

const Slider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsPressed(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
    setIsPressed(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("mouseleave", stopDragging);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setIsPressed(false);
        }}
        onMouseDown={onMouseDown}
        className="flex gap-2 pl-32 pr-10 mt-16 overflow-x-auto cursor-none select-none hide-scrollbar"
      >
        {images.map((path, idx) => (
          <Image
            src={path}
            key={idx}
            alt=""
            width={1920} // required but irrelevant
            height={1080}
            className="h-[350px] md:h-[450px] object-cover"
            draggable={false}
          />
        ))}
      </div>

      {/* Custom cursor */}
      {isHover && (
        <Image
          src={isPressed ? "/grab.svg" : "/hand.svg"}
          alt="custom cursor"
          width={40}
          height={40}
          style={{
            position: "fixed",
            left: cursorPos.x,
            top: cursorPos.y,
            width: 40,
            height: 40,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default Slider;
