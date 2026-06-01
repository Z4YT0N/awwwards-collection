import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const MusicStreamLine = ({ color }: { color: string }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useGSAP(() => {
    if (!divRef.current) return;
    const bars = Array.from(divRef.current.children);
    gsap.killTweensOf(bars);
    bars.forEach((bar, index) => {
      const randomDuration = 0.3 + Math.random() * 0.2;
      const randomDelay = index * 0.1 + Math.random() * 0.1;
      const randomScale = 3 + Math.random() * 2;
      if (isPlay)
        gsap.to(bar, {
          scaleY: randomScale,
          duration: randomDuration,
          delay: randomDelay,
          yoyo: true,
          repeat: -1,
        });
      else
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.2,
          ease: "power1.out",
        });
    });
  }, [isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.2;
    if (isPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked or failed", err);
          setIsPlay(false);
        });
      }
    } else audio.pause();
  }, [isPlay]);

  // 🖱️ Wait for first user click to start music
  useEffect(() => {
    const handleFirstClick = () => {
      setIsPlay(true);
      setIsFirstInteraction(true);
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);

    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  return (
    <>
      {!isFirstInteraction && (
        <div
          className={clsx(
            "fixed inset-0 flex flex-col items-center justify-end bottom-2 transition-opacity duration-700 animate-pulse",
            isFirstInteraction ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <p
            className={clsx(
              "md:text-xs text-[10px] font-medium tracking-wider",
              color === "bg-black" ? "text-black" : "text-white"
            )}
          >
            CLICK TO ENABLE SOUND
          </p>
        </div>
      )}
      <div
        onClick={() => setIsPlay(!isPlay)}
        className="flex justify-center items-center size-7 hover-animation"
      >
        <div ref={divRef} className="flex gap-1">
          <div className={clsx("w-0.5 h-1", color)} />
          <div className={clsx("w-0.5 h-1", color)} />
          <div className={clsx("w-0.5 h-1", color)} />
        </div>
        <audio ref={audioRef} src="/main-optimized.mp3" preload="auto" loop />
      </div>
    </>
  );
};

export default MusicStreamLine;
