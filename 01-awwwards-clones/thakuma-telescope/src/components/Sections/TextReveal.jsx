import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const containerRef = useRef();
  const titlesRef = useRef([]);

  const sectionData = [
    { id: "title-one", text: "Subtle Phase" },
    { id: "title-two", text: "Hidden Flow" },
    { id: "title-three", text: "Calm Glide" }
  ];

  useGSAP(() => {
    titlesRef.current.forEach((title, index) => {
      const heading = title.querySelector("h1");
      const text = heading.textContent;
      heading.textContent = "";

      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.classList.add("ta-char");
        span.textContent = char;
        heading.appendChild(span);
        return span;
      });

      // Character level setting
      chars.forEach((char, i) => {
        gsap.set(char, { y: i % 2 === 0 ? -150 : 150 });
      });

      const wrapper = title.querySelector(".text-reveal-content-wrapper");
      const initialX = index === 1 ? -100 : 100;

      ScrollTrigger.create({
        trigger: title,
        start: "top bottom",
        end: "top -20%",
        scrub: 1,
        onUpdate: (self) => {
          const wrapperX = initialX - self.progress * initialX;
          gsap.set(wrapper, { x: `${wrapperX}%` });

          chars.forEach((char, i) => {
            const staggerIndex = index === 1 ? chars.length - 1 - i : i;
            const startDelay = 0.1;
            const timelineScale = 1 - startDelay;
            const staggerFactor = 0.75;

            const delay = startDelay + (staggerIndex / chars.length) * staggerFactor;
            const duration = 1 - delay;

            let charP = 0;
            if (self.progress >= delay) {
              charP = Math.min(1, (self.progress - delay) / duration);
            }

            const initialY = i % 2 === 0 ? -150 : 150;
            gsap.set(char, { y: initialY - charP * initialY });
          });
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="text-reveal-intro">
        <h1>Scroll begins</h1>
      </section>

      <div className="text-reveal-container">
        {sectionData.map((item, idx) => (
          <div
            key={item.id}
            className="text-reveal-item"
            ref={(el) => (titlesRef.current[idx] = el)}
          >
            <div className="text-reveal-content-wrapper">
              <h1>{item.text}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
