import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { getImage } from '../utils/media';
import heroBgVid from "../assets/videos/hero-bg.mp4"

const HeroSection = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });

    const isTabHero = useMediaQuery({
        query: "(max-width:1024px)",
    });

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const titleSplit = SplitText.create(".hero-title", { type: "chars" });

            const tl = gsap.timeline({ delay: 1 });

            tl.to(".hero-content", {
                opacity: 1,
                y: 0,
                ease: "power1.inOut"
            })
                .to(".hero-text-scroll", {
                    duration: 1,
                    clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
                    ease: "circ.out"
                }, "-=0.5")
                .from(titleSplit.chars, {
                    yPercent: 200,
                    stagger: 0.02,
                    ease: "power2.out"
                }, "-=0.5");

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-container",
                    start: "1% top",
                    end: "bottom top",
                    scrub: true,
                    // markers: true
                }
            });

            heroTl.to(".hero-container", {
                rotate: 7,
                scale: 0.9,
                yPercent: 30,
                ease: "power1.inOut"
            });
        });
    });


    return (
        <section>
            <div className="hero-container">
                {(isTabHero ?
                    <>
                        {isMobHero && <img src={getImage("hero-bg.png")} alt="" className="absolute bottom-40 object-cover w-full h-full" />}
                        <img src={getImage("hero-img.png")} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto" />
                    </>
                    :
                    <video src={heroBgVid} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="hero-content opacity-0">
                    <div className="overflow-hidden">
                        <h1 className="hero-title lg:p-0 p-2">Freaking Delicious</h1>
                    </div>
                    <div className="hero-text-scroll">
                        <div className="hero-subtitle">
                            <h1>Protein + Caffine</h1>
                        </div>
                    </div>
                    <h2>Live life to the fullest with SPYLT: Shatter boredom and embrace your inner kid with every deliciously smooth chug.</h2>
                    <div className="hero-button hover:bg-[#e9aa56]">
                        <a href="#">Chug a SPYLT</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;