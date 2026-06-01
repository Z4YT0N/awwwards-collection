import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

const Bars = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!divRef.current) return;
    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { stagger: 0.5, ease: "back.out" },
      })
      .to(divRef.current.children, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      })
      .to(divRef.current.children, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });
  }, []);
  return (
    <div ref={divRef} className="flex items-center justify-center gap-2">
      <Bar bgColor="bg-gray-500" />
      <Bar bgColor="bg-red-500" />
      <Bar bgColor="bg-white" />
    </div>
  );
};

export default Bars;

const Bar = ({ bgColor }: { bgColor: string }) => {
  return (
    <div
      className={clsx("w-2 h-32 transition-discrete duration-700", bgColor)}
      style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
    />
  );
};
