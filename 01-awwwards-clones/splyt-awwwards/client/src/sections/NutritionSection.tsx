import { useGSAP } from "@gsap/react"
import { nutrientLists } from "../constants/details"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive"
import { getImage } from '../utils/media';

const NutritionSection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const headingSplit = SplitText.create(".h1-animate", { type: "chars" });
            const paraSplit = SplitText.create(".para-animate", { type: "words" });

            const nutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".nutrition-section",
                    start: "top 30%",
                    end: "top 10%",
                    scrub: true,
                    // markers: true
                }
            });

            nutTl.from(headingSplit.chars, {
                stagger: 0.2,
                yPercent: 600,
                rotate: 4,
                ease: "power1.inOut"
            }).from(paraSplit.words, {
                opacity: 0,
                stagger: 0.2,
                yPercent: 30,
                rotate: 4,
                ease: "power1.inOut"
            }, "-=0.5").to(".nutrition-text-scroll", {
                duration: 2,
                clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
            }, "-=0.2");
        });
    });

    return (
        <section className="nutrition-section">
            <img src={getImage("slider-dip.png")} alt="" className="w-full object-cover z-0" />
            <img src={getImage("big-img.png")} alt="" className="big-img" />
            <div className="flex flex-col justify-center">
                <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
                    <div className="relative inline-block md:translate-y-20 z-100">
                        <div className="general-title relative flex flex-col justify-center items-center gap-24">
                            <div className="overflow-hidden place-self-start h1-animate lg:p-0 p-1">
                                <h1>It still does</h1>
                            </div>
                            <div className="nutrition-text-scroll place-self-start">
                                <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3 inline-block">
                                    <h2 className="text-milk-yellow rolling">Body Good</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:justify-end items-start md:translate-y-20 translate-y-10">
                        <div className="md:max-w-xs w-[70%]">
                            <p className="text-sm md:text-right text-balance font-paragraph para-animate">Milk contains a wide array of nutrients including vitamins, minerals, and proteins and that is lactose free.</p>
                        </div>
                    </div>
                </div>

                <div className="nutrition-box">
                    <div className="list-wrapper">
                        {
                            (isMobile ? nutrientLists.slice(0, 3) : nutrientLists).map((nutrients, index, arr) => (
                                <div key={index} className="relative flex-1 col-center">
                                    <div className="">
                                        <p className="md:text-sm font-paragraph">{nutrients.label}</p>
                                        <p className="font-paragraph text-[10px] mt-[6px]">up to</p>
                                        <p className="text-2xl md:text-2xl tracking-tighter font-bold">{nutrients.amount}</p>
                                    </div>
                                    {
                                        index !== arr.length - 1 && (
                                            <div className="spacer-border" />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NutritionSection