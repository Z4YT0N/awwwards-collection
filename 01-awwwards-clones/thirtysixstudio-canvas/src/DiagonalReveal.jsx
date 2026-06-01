import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DiagonalReveal = ({ text, className = '' }) => {
  const containerRef = useRef(null);
  const revealed = useRef(false); // to prevent re-animation

  useEffect(() => {
    const container = containerRef.current;
    const lineInners = container.querySelectorAll('.line-inner');

    // set initial style
    gsap.set(lineInners, {
      y: 100,
      x: 50,
      opacity: 0,
      rotationX: 30,
      skewY: 5,
      transformOrigin: 'left bottom'
    });

    const onScroll = () => {
      if (revealed.current) return;

      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;

      if (isVisible) {
        revealed.current = true;

        gsap.to(lineInners, {
          y: 0,
          x: 0,
          opacity: 1,
          rotationX: 0,
          skewY: 0,
          duration: 1,
          stagger: {
            amount: 0.8,
            from: 'start'
          },
          ease: 'power2.out'
        });
      }
    };

    // Use native scroll listener (Locomotive triggers this too)
    window.addEventListener('scroll', onScroll);
    onScroll(); // call once in case already in view

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const lines = text.split('\n');

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="line-reveal block overflow-hidden">
          <span className="line-inner block">{line}</span>
        </span>
      ))}
    </div>
  );
};

export default DiagonalReveal;
