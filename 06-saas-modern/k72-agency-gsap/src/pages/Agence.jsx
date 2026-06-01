import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef, useMemo, useState } from 'react'

import Carl from "../assets/teamMembers/Carl.jpg";
import Olivier from "../assets/teamMembers/Olivier.jpg";
import Lawrence from "../assets/teamMembers/Lawrence.jpg";
import HugoJoseph from "../assets/teamMembers/HugoJoseph.jpg";
import ChantalG from "../assets/teamMembers/ChantalG.jpg";
import MyleneS from "../assets/teamMembers/MyleneS.jpg";
import SophieA from "../assets/teamMembers/SophieA.jpg";
import Claire from "../assets/teamMembers/Claire.jpg";
import Michele from "../assets/teamMembers/Michele.jpg";
import MEL from "../assets/teamMembers/MEL.jpg";
import CAMILLE from "../assets/teamMembers/CAMILLE.jpg";
import MAXIME from "../assets/teamMembers/MAXIME.jpg";
import MEGGIE from "../assets/teamMembers/MEGGIE.jpg";
import Joel from "../assets/teamMembers/joel.jpg";

const Agence = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    gsap.registerPlugin(ScrollTrigger)

    const imageDivRef = useRef(null)
    const imageRef = useRef(null)

    const imageArray = useMemo(() => [
        Carl,
        Olivier,
        Lawrence,
        HugoJoseph,
        ChantalG,
        MyleneS,
        SophieA,
        Claire,
        Michele,
        MEL,
        CAMILLE,
        MAXIME,
        MEGGIE,
        Joel,
    ], []);

    useGSAP(function () {
        // Preload first few images for smooth animation
        const preloadImages = imageArray.slice(0, 3);
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        gsap.to(imageDivRef.current, {
            scrollTrigger: {
                trigger: imageDivRef.current,
                start: 'top 28%',
                end: 'top -70%',
                pin: true,
                pinSpacing: true,
                pinReparent: true,
                pinType: 'transform',
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (elem) => {
                    let imageIndex;
                    if (elem.progress < 1) {
                        imageIndex = Math.floor(elem.progress * imageArray.length)
                    } else {
                        imageIndex = imageArray.length - 1
                    }
                    
                    // Preload next image for smooth transition
                    if (imageIndex < imageArray.length - 1) {
                        const nextImg = new Image();
                        nextImg.src = imageArray[imageIndex + 1];
                    }
                    
                    imageRef.current.src = imageArray[imageIndex]
                }
            }
        })
    })

    return (
        <div className='parent'>
            <div id='page1' className='py-1'>
                <div ref={imageDivRef} className='absolute overflow-hidden lg:h-[20vw] h-[30vw] lg:rounded-3xl rounded-xl lg:w-[15vw] w-[25vw] lg:top-96 -top-80 lg:left-[30vw] left-[30vw]' role="img" aria-label="Team member gallery animation">
                    <img ref={imageRef} className='h-full object-cover w-full' src={Carl} alt="Team member portrait transitioning through team gallery" />
                </div>

            
                <div className='relative font-[font2]'>
                    <div className='lg:mt-[55vh] mt-[30vh]'>
                        <h1 className='text-[20vw] text-center uppercase leading-[18vw]'>SEVEN7Y <br />
                            TWO</h1>
                    </div>

                    <div className='lg:pl-[55%] lg:mt-16 mt-8 p-4 lg:p-6'>
                        <p className='lg:text-3xl text-lg lg:leading-relaxed leading-snug font-light text-gray-800 max-w-xl'>
                            We believe in curiosity-driven creativity that prioritizes genuine connection over ego. 
                            A brand isn't just a logo—it's a living entity with values, personality, and narrative. 
                            We craft stories that transcend fleeting trends, building lasting influence through authentic storytelling.
                        </p>
                    </div>
                </div>
            </div>
            <div id='page2' className="min-h-screen py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl lg:text-6xl text-center mb-16 font-[font2]">MEET THE TEAM</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {imageArray.map((member, index) => (
                            <div key={index} className="group">
                                <div className="overflow-hidden rounded-2xl mb-4">
                                    <img 
                                        src={member} 
                                        alt={`Team member ${index + 1}`}
                                        className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agence