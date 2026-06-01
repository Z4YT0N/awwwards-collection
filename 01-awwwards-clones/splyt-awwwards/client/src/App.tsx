import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar"
import HeroSection from "./sections/HeroSection"
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenifitSection from "./sections/BenifitSection";
import FooterSection from "./sections/FooterSection";
import BottomBanner from "./sections/BottomBanner";
import "remixicon/fonts/remixicon.css";
import TestimonialSection from "./sections/TestimonialSection";
import PreLoader from "./components/PreLoader";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
    const [loaded, setLoaded] = useState(false);

    useGSAP(() => {
        if (loaded && !ScrollSmoother.get()) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.5,
                effects: true,
            });
            ScrollTrigger.refresh();
        }
    }, [loaded]);

    return (
        <main>
            {!loaded && <PreLoader onComplete={() => setLoaded(true)} />}

            {loaded && (
                <>
                    <Navbar />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <HeroSection />
                            <MessageSection />
                            <FlavorSection />
                            <NutritionSection />
                            <div>
                                <BenifitSection />
                                <TestimonialSection />
                            </div>
                            <BottomBanner />
                            <FooterSection />
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default App