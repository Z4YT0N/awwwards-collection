"use client";
import { useRevealer } from "@/hooks/useRevealer";

const Studio = () => {
    useRevealer();
    
    return (
        <>
            <div className ="revealer"></div>
            <div className="studio">
                <div className="col">
                    <h2>Our Story</h2>
                </div>
                <div className="col">
                    <h2>At Zayno, we belive creativity isn't just a skill, a mindset.
                        Born from a passion for bold ideas and beautifully crafted
                        storytelling, we're a collectivve of designers, stragtegists, and 
                        dreamers who thrive at the intersection of art and inoovation.
                        Today, we collaborte with visionary clients around the world to
                        shape identities.</h2>

                        <div className="about-img">
                            <img src="/assets/studio.jpg" alt="" />

                        </div>
                </div>
            </div>        
        </>
    );
};

export default Studio
