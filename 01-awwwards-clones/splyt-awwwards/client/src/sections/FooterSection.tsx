import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { getImage } from '../utils/media';
import splash from "../assets/videos/splash.mp4"
import { useMediaQuery } from "react-responsive";

const FooterSection = () => {

    const isMobF = useMediaQuery({
        query: "(max-width: 768px)",
    });

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const footTextSplit = SplitText.create(".footer-title-animation", { type: "chars" });

            gsap.from(footTextSplit.chars, {
                yPercent: 200,
                stagger: 0.02,
                ease: "power1.inOut",
                zIndex: 0,
                scrollTrigger: {
                    trigger: ".footer-section",
                    start: `${isMobF ? "top 60%" : "top 50%"}`,
                    end: `${isMobF ? "top 20%" : "top 10%"}`,
                    scrub: 1.5,
                    // markers: true
                }
            });
        });
    });

    return (
        <section className="footer-section lg:pt-20">

            <div className="2xl:h-[110dvh] relative z-100 lg:pt-[8vh] pt-[8vh]">
                <div className="overflow-hidden">
                    <h1 className="general-title text-center text-milk footer-title-animation lg:pb-0 pb-5">#CHUGRESPONSIBLY</h1>
                </div>
            </div>
            {
                isMobF ?
                    <img src={getImage("footer-drink.png")} alt="footer img" className="absolute object-contain top-0 mix-blend-lighten z-10 opacity-90" />
                    :
                    <video src={splash} autoPlay playsInline muted className="absolute object-contain top-[-4%] mix-blend-lighten z-10 opacity-90" />
            }


            <div className="flex-center gap-3 relative z-10 md:mt-10 mt-5">
                <div className="social-btn">
                    <img src={getImage("yt.svg")} alt="yt" />
                </div>
                <div className="social-btn">
                    <img src={getImage("insta.svg")} alt="yt" />
                </div>
                <div className="social-btn">
                    <img src={getImage("tiktok.svg")} alt="yt" />
                </div>
            </div>

            <div className="mt-30 lg:mb-32 mb-20 md:px-7 px-5 flex gap-10 md:flex-row flex-col justify-between items-start text-milk font-paragraph md:text-sm font-medium">
                <div className="flex items-start md:gap-10 gap-5">
                    <div>
                        <p>SPYLT Flavors</p>
                    </div>
                    <div>
                        <p>Chug Club</p>
                        <p>Student Marketing</p>
                        <p>Dairy Dealers</p>
                    </div>
                    <div>
                        <p>Company</p>
                        <p>Contacts</p>
                        <p>Tasty Talk</p>
                    </div>
                </div>
                <div className="md:max-w-sm">
                    <p>
                        Get Exclusive Early Access and Stay Informed About Product
                        Updates, Events, and More!
                    </p>
                    <div className="flex justify-between items-center border-b border-[#D9D9D9] py-4 md:mt-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full placeholder:font-sans placeholder:text-[#999999]"
                        />
                        <img src={getImage("arrow.svg")} alt="arrow" />
                    </div>
                </div>
            </div>

            <div className="copyright-box">
                <p>Copyright © 2025 Spylt - All Rights Reserved</p>
                <div className="flex items-center gap-7">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;