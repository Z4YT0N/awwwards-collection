import gsap, { Power4 } from "gsap/all";
import { useEffect } from "react";

const Overflow = (elements, delay=0) => {
    useEffect(() => {
        gsap.fromTo(elements, {
          transformOrigin: "left",
          y: "100%",
          rotate: 30
        }, {
          y: 0,
          rotate: 0,
    
          duration: 2,
          delay: delay,
          ease: Power4.easeOut,
          stagger: .1
        });
      }, []);
}

export default Overflow;