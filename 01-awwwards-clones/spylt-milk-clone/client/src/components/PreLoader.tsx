import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import preImg from "../assets/images/nav-logo.svg"

const PreLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [canHide, setCanHide] = useState(false); // flag to control hiding

    useEffect(() => {
        const MIN_DURATION = 1000; // minimum 1 seconds
        const startTime = performance.now();

        const resources: (HTMLImageElement | HTMLVideoElement)[] = [
            ...Array.from(document.images),
            ...Array.from(document.querySelectorAll("video")),
        ];

        const total = resources.length || 1;
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            const percent = Math.round((loaded / total) * 100);
            setProgress((prev) => (percent > prev ? percent : prev));
        };

        resources.forEach((res) => {
            if (
                (res instanceof HTMLImageElement && res.complete) ||
                (res instanceof HTMLVideoElement && res.readyState >= 3)
            ) {
                updateProgress();
            } else {
                res.addEventListener("load", updateProgress);
                res.addEventListener("loadeddata", updateProgress);
                res.addEventListener("error", updateProgress);
            }
        });

        if (document.fonts) {
            document.fonts.ready.then(() => {
                setProgress((prev) => (prev < 90 ? 90 : prev));
            });
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    const elapsed = performance.now() - startTime;
                    const remaining = MIN_DURATION - elapsed;
                    if (remaining > 0) {
                        setTimeout(() => setCanHide(true), remaining);
                    } else {
                        setCanHide(true);
                    }
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        const handleWindowLoad = () => {
            const elapsed = performance.now() - startTime;
            const remaining = MIN_DURATION - elapsed;
            if (remaining > 0) {
                setTimeout(() => setCanHide(true), remaining);
            } else {
                setCanHide(true);
            }
        };
        window.addEventListener("load", handleWindowLoad);

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", handleWindowLoad);
        };
    }, []);

    useGSAP(() => {
        if (progress >= 100 && canHide) {
            gsap.to(".preloader", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete,
            });
        }
    }, [progress, canHide, onComplete]);

    return (
        <div className="preloader fixed inset-0 flex flex-col items-center justify-end pb-20 z-[9999] text-white bg-[#7f3b2d]">
            {/* <h1 className="text-7xl font-bold tracking-widest lg:mb-30">SPYLT MILK</h1> */}
            <img src={preImg} alt="pre img" className="lg:mb-40 mb-[60%] lg:w-[20%] w-[40%]" />
            <p className="lg:text-[2rem] text-[1.5rem] tracking-wider">{progress}%</p>
            <div className="mt-2 lg:w-[12rem] w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default PreLoader;