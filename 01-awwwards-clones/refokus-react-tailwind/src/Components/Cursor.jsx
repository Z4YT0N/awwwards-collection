import React, { useEffect, useState } from 'react';
import Button from '../Components/Button'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(30); // Default size

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('button, a')) {
        setSize(64); // Increase size for buttons and links
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest('button, a')) {
        setSize(30); // Reset size
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        mixBlendMode: 'difference',  // Apply mix-blend-mode
        transition: 'width 0.3s ease, height 0.3s ease', // Smooth size transition
        zIndex: 9999, // Ensure cursor is on top
      }}
      className="fixed bg-white w-4 h-4 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
};

export default CustomCursor;
