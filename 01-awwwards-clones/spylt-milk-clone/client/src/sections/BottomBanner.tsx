import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { getImage } from '../utils/media';

const BottomBanner = () => {

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const bTitleSplit = SplitText.create(".b-title", { type: "chars" });

            const revealTl = gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: ".bottom-banner",
                    start: "top 50%",
                    end: "top 10%",
                    scrub: 1.5,
                    // markers: true
                }
            });

            revealTl.from(bTitleSplit.chars, {
                stagger: 0.2,
                opacity: 0,
                rotate: 3,
                yPercent: 30,
                ease: "power1.inOut"
            }).to(".bottom-banner .rolling-animation", {
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            });
        });
    });


    return (
        <section className="bottom-banner 2xl:min-h-dvh lg:w-full w-[200%] h-full overflow-hidden relative bg-[#222123] flex flex-col justify-center items-start">
            <img src={getImage("footer-dip.png")} alt="footer-img" className="w-full object-cover -translate-y-1" />
            <img src={getImage("bottom-banner.svg")} alt="" className="h-fit mt-10" />

            <div className="absolute w-[35rem] h-[24rem] z-100 lg:top-[30%] top-[50%] lg:left-20 left-10">
                <div className="relative inline-block md:translate-y-20 z-100">
                    <div className="general-title relative flex flex-col justify-center items-center gap-24">
                        <div className="overflow-hidden place-self-start">
                            <h1 className="text-white b-title">Right Around</h1>
                        </div>
                        <div className="rotate-[3deg]  rolling-animation text-nowrap md:-mt-28 -mt-24 place-self-start">
                            <div className="bg-[#fed775] pb-4 md:pt-0 pt-3 md:px-5 px-3 inline-block">
                                <h2 className="text-[#523122]">The Corner</h2>
                            </div>
                        </div>
                    </div>
                    <div className="lg:mt-10 mt-2 text-[#f3e2d5] text-sm font-paragraph flex flex-col lg:gap-14 gap-8">
                        <div>
                            <p className=" lg:w-1/2 w-[80%]">Buy our drinks at your local store or get them delivered (to your door).</p>
                        </div>
                        <div className="font-medium">
                            <a href="#" className="px-10 py-4 rounded-4xl bg-black text-[#f3e2d5]">FIND IN STORES</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default BottomBanner;