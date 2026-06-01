"use client";
import { MainStudioModel } from "@/components/MainStudioModel";
import { View } from "@react-three/drei";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 400 });
  const [currentIndex, setCurrentIndex] = useState(1);
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentIndex < 2) setCurrentIndex((prev) => prev + 1);
  };
  return (
    <>
      <View className="w-full h-dvh">
        <MainStudioModel
          currentIndex={currentIndex}
          scale={isMobile ? 0.8 : 1}
        />
      </View>
      <p className="absolute z-10 top-11/12 place-self-center text-white/80 md:text-xs text-[10px] font-medium tracking-wider">
        SELECT A PRODUCT TO BEGIN
      </p>
      <div
        id="left-icon"
        className="absolute z-20 top-10/12 left-1/12 bg-white mask-[url(/icons/left.svg)] size-12 mask-no-repeat border hover-animation md:hidden block"
        onClick={handlePrev}
      />
      <div
        id="right-icon"
        className="absolute z-20 top-10/12 right-1/12 bg-white mask-[url(/icons/right.svg)] size-12 mask-no-repeat border hover-animation md:hidden block"
        onClick={handleNext}
      />
    </>
  );
}
