import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import cn from 'classnames';
import SplitText from "../utils/Split3.min.js";
import SectionHeader from "./SectionHeader";
import useOnScreen from "../hooks/useOnScreen";

const About = () => {
  const ref = useRef();
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) {
      setReveal(true);
    }
  },[onScreen]);

  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#headline", {
        type: "lines",
      });
      gsap.to(split.lines, {
        duration: 1,
        y: -20,
        opacity: 1,
        stagger: 0.1,
        ease: "power2",
      });
    }
  }, [reveal]);

  return (
    <section className="about-section" data-scroll-section>
      <SectionHeader title="about" />
      <p ref={ref} id="headline" className={cn({'is-reveal': reveal})}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        est, porro fugiat natus necessitatibus voluptatum nulla dignissimos,
        dolorem unde et quam voluptatibus ipsam explicabo ducimus quo. Accusamus
        pariatur ipsa dolores.
      </p>
    </section>
  );
};

export default About;
