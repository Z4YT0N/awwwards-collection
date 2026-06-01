import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const FlavorSection = () => {

    const flavorRef = useRef<HTMLDivElement | null>(null);
    const slideRef = useRef<HTMLDivElement | null>(null);

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    });
    const isMob = useMediaQuery({
        query: "(max-width: 768px)",
    });

    useGSAP(() => {
        //Card Slider animation (Horizontally)
        if (!slideRef.current) return;

        const scrollAmount = slideRef.current.scrollWidth - window.innerWidth;
        // const scrollAmountH = slideRef.current.scrollHeight - window.innerHeight;

        if (!isTablet) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".flavor-section",
                    start: "top 0%",
                    end: "+=4000",
                    scrub: true,
                    pin: true,
                    // markers: true
                },
            });

            tl.to(".flavor-scroll-inner", {
                x: isMob ? 0 : `-${scrollAmount}px`,
                // y: isMob ? `${scrollAmount}px` : 0,
                ease: "power1.inOut",
            });
        };
        if (isMob) {
            const btn = document.querySelector(".fixed-btn") as HTMLElement | null;
            if (!btn) return;

            ScrollTrigger.create({
                trigger: ".flavor-section",
                start: "top 90%",
                end: "bottom bottom",
                onToggle: (self) => {
                    btn.style.position = self.isActive ? "fixed" : "absolute";
                    btn.style.bottom = "0%";
                    btn.style.left = "50%";
                    btn.style.transform = "translateX(-50%)";
                },
            });

            return () => ScrollTrigger.killAll();
        };

    });

    return (
        <section ref={flavorRef} className="flavor-section relative overflow-hidden">
            {/* Fixed button (stays in bottom-center during scroll) */}
            <div
                className={`${isMob ?
                    "fixed-btn w-full fixed py-4 h-22 left-1/2 z-[100] flex justify-center bg-milk"
                    :
                    "absolute bottom-[10%] left-1/2 -translate-x-1/2 z-[100] flex justify-center"
                    }`}
            >
                <button type="button" className="text-sm rounded-4xl bg-[#e3a458] px-10 md:py-4 py-0 cursor-pointer shadow-md hover:bg-amber-500 transition-all" >
                    Get It Now
                </button>
            </div>
            {/* This container moves horizontally */}
            <div className="flavor-scroll-inner h-full flex lg:flex-row flex-col relative">
                <div className="lg:w-[57%] flex-none h-80 lg:h-full lg:mt-[9%] xl:mt-0 lg:pb-50">
                    <FlavorTitle />
                </div>
                <div ref={slideRef} className="lg:pb-0 pb-8 slider-con">
                    <FlavorSlider />
                </div>
            </div>

        </section >
    );
};

export default FlavorSection;