import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Register ScrollTrigger plugin with GSAP for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interface for component props
interface AnimatedTitleProps {
  title: string;          // The text to be animated
  containerClass?: string;
  className?: string;// Optional CSS classes for container
}

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
  // Create a ref to hold the container element for GSAP animations
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a GSAP context for scoped animations
    const ctx = gsap.context(() => {
      // Create a timeline for coordinated animations
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,    // Element that triggers animation
          start: "100 bottom",             // Start when element is 100px from bottom of viewport
          end: "center bottom",            // End when element center reaches bottom of viewport
          toggleActions: "play none none reverse", // Animation behavior on scroll
        },
      });

      // Animate each word with a 3D transform effect
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,                      // Fade in
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Reset 3D transforms
          ease: "power2.inOut",            // Smooth easing function
          stagger: 0.02,                   // Slight delay between each word
        },
        0                                  // Start at beginning of timeline
      );
    }, containerRef);

    // Cleanup function to prevent memory leaks
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {/* Split text by line breaks and create containers for each line */}
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {/* Split each line into words and create animated spans */}
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;