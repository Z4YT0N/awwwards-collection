import { ShirtType } from "@/lib/textures";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const ScrollIndicator = ({ shirtType }: { shirtType: ShirtType }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useGSAP(() => {
    if (!divRef.current) return;
    gsap.to(divRef.current, {
      y: 50,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <div
      className={clsx(
        "fixed flex flex-col items-center z-10 top-4/5 place-self-center gap-5 transition-opacity duration-500",
        isScrolling ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-10 h-16">
        <div className="flex justify-between opacity-50">
          {/* line */}
          <div
            className={clsx(
              "w-px h-16 place-self-center",
              shirtType === "white" ? "bg-black" : "bg-white"
            )}
          />
          <div
            className={clsx(
              "w-px h-16 place-self-center",
              shirtType === "white" ? "bg-black" : "bg-white"
            )}
          />
        </div>

        {/* circle */}
        <div
          ref={divRef}
          className={clsx(
            "absolute size-4 border rounded-full left-[12] top-0",
            shirtType === "white" ? "text-black" : "text-white"
          )}
        />
      </div>
      <div
        className={
          (clsx("md:text-sm text-xs tracking-wider"),
          shirtType === "white" ? "text-black" : "text-white")
        }
      >
        SCROLL TO EXPLORE
      </div>
    </div>
  );
};

export default ScrollIndicator;
