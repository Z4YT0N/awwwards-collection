import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

// Type definitions

// Define valid video indices (we have 4 videos)
type VideoIndex = 1 | 2 | 3 | 4;

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // --- STATE MANAGEMENT ---
  // Current video being played (1-4)
  const [currentIndex, setCurrentIndex] = useState<VideoIndex>(1);
  // Track if preview video was clicked
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  // Show loading screen until videos are ready
  const [loading, setLoading] = useState<boolean>(true);
  // Count how many videos have loaded
  const [loadedVideos, setLoadedVideos] = useState<number>(0);

  const totalVideos: number = 4;
  const nextVdRef = useRef<HTMLVideoElement | null>(null);           // Reference to video element

  // --- VIDEO HANDLING ---
  // Count loaded videos and hide loader when done
  const handleVideoLoad = (): void => {
    setLoadedVideos((prev: number) => prev + 1);
  };

  // Hide loader when all videos are ready
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handle click on preview video
  const handleMiniVdClick = (): void => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => ((prevIndex % totalVideos) + 1) as VideoIndex);
  };

  // --- ANIMATIONS ---
  // Video transition animation when clicked
  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        // Initial setup - prevent white flash
        gsap.set("#next-video", { 
          visibility: "visible",
          opacity: 10 
        });

        // Smooth scale up animation
        gsap.to("#next-video", {
          opacity: 1,
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power3.inOut",
          onStart: () => { 
            nextVdRef.current?.play();  // Start playing when animation begins
          },
        });

        // Scale down current preview
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // Frame shape animation on scroll
  useGSAP(() => {
    // Set initial polygon shape
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    
    // Animate shape on scroll
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // --- HELPER FUNCTIONS ---
  // Get video file path based on index
  const getVideoSrc = (index: number): string => `videos/hero-${index}.webm`;

  return (
    // --- LAYOUT STRUCTURE ---
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading spinner - shows until videos are ready */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main video container with shape-shifting frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="relative h-full w-full bg-blue-75"> {/* Background color to prevent white flash */}
          <div>
            {/* Small preview video that user can click */}
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <VideoPreview>
                <div
                  onClick={handleMiniVdClick}
                  className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                >
                  <video
                    ref={nextVdRef}
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    loop
                    muted
                    id="current-video"
                    className="size-64 origin-center scale-150 object-cover object-center"
                    onLoadedData={handleVideoLoad}
                  />
                </div>
              </VideoPreview>
            </div>

            {/* Full screen video that appears after click */}
            <video
              ref={nextVdRef}
              src={getVideoSrc(currentIndex)}
              loop
              muted
              id="next-video"
              className="absolute-center invisible absolute z-20 size-64 object-cover object-center opacity-0"
              onLoadedData={handleVideoLoad}
            />
            {/* Background video that's always playing */}
            <video
              src={getVideoSrc(
                currentIndex === totalVideos - 1 ? 1 : currentIndex
              )}
              autoPlay
              loop
              muted
              className="absolute left-0 top-0 size-full object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          </div>

          {/* Text overlays and button */}
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            G<b>A</b>MING
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                redefi<b>n</b>e
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                Enter the Metagame Layer <br /> Unleash the Play Economy
              </p>

              <Button
                id="watch-trailer"
                title="Watch trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </div>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;