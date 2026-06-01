import React, { useState, useRef, useEffect } from 'react'
import './index.css'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DiagonalReveal from './DiagonalReveal'

const App = () => {

    const [showCanvas, setShowCanvas] = useState(false);
    const [isTextBlack, setIsTextBlack] = useState(false);
    const canvasRef = useRef(null);
    const growingRef = useRef(null);
    const isGrown = useRef(false);


    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const locomotiveScroll = new LocomotiveScroll();
    }, [])

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Only move if not animating scale
            if (growingRef.current && !growingRef.current.classList.contains('growing-animating')) {
                gsap.to(growingRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);



    useGSAP(() => {
        const handleClick = (e) => {
            if (!growingRef.current) return;

            growingRef.current.classList.add('growing-animating');

            gsap.set(growingRef.current, {
                x: e.clientX,
                y: e.clientY,
            });

            if (!isGrown.current) {
                // Grow
                gsap.to(growingRef.current, {
                    scale: 1000,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        growingRef.current.classList.remove('growing-animating');

                    }
                });
                setShowCanvas(true);
                setIsTextBlack(true);


            } else {
                // Shrink
                gsap.to(growingRef.current, {
                    scale: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        growingRef.current.classList.remove('growing-animating');
                        setShowCanvas(false);
                        setIsTextBlack(false);
                        isGrown.current = false;
                    }
                });

            }

            isGrown.current = !isGrown.current;
        };

        const canvasElem = canvasRef.current;
        if (canvasElem) {
            canvasElem.addEventListener("click", handleClick);
        }
        return () => {
            if (canvasElem) {
                canvasElem.removeEventListener("click", handleClick);
            }
        };
    }, []);



    // Helper to conditionally apply text-black
    const textColorClass = isTextBlack ? 'text-black' : 'text-white';

    return (
        <>
            <span ref={growingRef} className="growing fixed top-0 left-0 w-5 h-5 rounded-full"></span>
            <div className={`w-full min-h-screen bg-black ${textColorClass}`}>
                {
                    showCanvas && data[0].map((canvasdets, index) => (
                        <Canvas key={index} details={canvasdets} />
                    ))
                }

                <div className='w-full h-screen relative z-[1]'>
                    <nav className={`fixed top-0 left-0 w-full flex items-center py-4 shadow-md z-50 border-b border-gray-800`}>
                        <div className={`text-xl font-regular mr-[45%] ml-4 ${textColorClass}`}>Thirtysixstudios</div>
                        <div className={`links flex gap-6 text-sm ml-100 w-full mr-[20%] ${textColorClass}`}>
                            <a href="">What we do</a>
                            <a href="">Who we are</a>
                            <a href="">How we give back</a>
                            <a href="">Talk to us</a>
                        </div>
                    </nav>
                    <div className="textContainer px-[20%] mt-32 ">
                        <div className="text w-[40%] ">
                            <h3 className={`text-3xl ${textColorClass}`}>
                                At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
                            </h3>
                        </div>
                        <div className="text w-[50%]">
                            <p className={`mt-10 text-sm ${textColorClass}`}>
                                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
                            </p>
                            <p className={`mt-10 text-sm ${textColorClass}`}>Scroll</p>
                        </div>
                    </div>

                    <div className="w-full  mt-[10%] ml-4">
                        <h1 ref={canvasRef} className={`text-[15vw] ${textColorClass}`}>Thirtysixstudio</h1>
                    </div>
                </div>
            </div>

            <div className={`w-full h-screen flex justify-evenly ml-[4%] border-t border-gray-800 pt-20 relative z-[1] ${textColorClass} border-b border-gray-800 overflow-x-hidden`}>
                {
                    showCanvas && data[1].map((canvasdets, index) => (
                        <Canvas key={index} details={canvasdets} />
                    ))
                }
                <div className={`whatwedo text-2xl ${textColorClass}`}>
                    01 ---- WHAT WE DO</div>

                <div className="content w-[25%] ml-[12%]">
                    <div className={`first-box text-5xl mb-[30%] ${textColorClass}`}>We aim to elevate digital production in the advertising space, bringing your ideas to life.</div>
                    <div className="second-box text-md">
                        <p className={`mb-[6%] ${textColorClass}`}>As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.</p>
                        <p className={textColorClass}>
                            Our commitment to innovation and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.</p>
                    </div>
                </div>
            </div>

            <div className={`w-full h-screen relative z-[1] ${textColorClass} pt-40`}>
                {
                    showCanvas && data[2].map((canvasdets, index) => {
                        return <Canvas key={index} details={canvasdets} />
                    })
                }
                <div className='ml-[25%] mb-20'>
                    OUR SERVICES
                </div>

                <div className='ml-[25%]'>
                    <DiagonalReveal
                        className="text-4xl w-[65% ]"
                        text={`We provide you with captivating design, interactive
                            animations. Reliable code, and immaculate project
                            coordination. Whether you need a campaign built 
                            from scratch or assistance at a specific phase,
                            we’ve got you covered.`}
                    />
                </div>

            </div>
        </>
    )
}

export default App
