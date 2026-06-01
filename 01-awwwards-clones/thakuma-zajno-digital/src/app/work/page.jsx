"use client";
import { useRevealer } from "@/hooks/useRevealer";

const Work = () => {
    useRevealer();
    
    return (
        <>
            <div className ="revealer"></div>
            <div className="work">
                <h1>selected work</h1>

                <div className="projects">
                    <img src="/assets/img1.jpg" alt="" />
                    <img src="/assets/img2.jpg" alt="" />
                    <img src="/assets/img3.jpg" alt="" />
                    <img src="/assets/img4.jpg" alt="" />

                </div>
            </div>
        </>
    );
};

export default Work;