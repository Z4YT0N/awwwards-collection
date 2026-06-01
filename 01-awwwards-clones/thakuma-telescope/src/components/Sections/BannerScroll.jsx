import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BannerScroll() {
  const containerRef = useRef();
  const bannerRef = useRef();
  const imagesRef = useRef([]);

  useGSAP(() => {
    const banner = bannerRef.current;
    const imagesContainer = banner.querySelector(".project-banner-img-container");
    const introWords = banner.querySelectorAll(".project-banner-word");
    const maskLayers = banner.querySelectorAll(".mask");
    const headerH1 = banner.querySelector(".project-banner-header h1");

    // Split text manually for header words
    const text = headerH1.textContent;
    headerH1.textContent = "";
    const words = text.split(" ").map(word => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = 0;
      span.style.display = "inline-block";
      headerH1.appendChild(span);
      return span;
    });

    const moveDistance = window.innerWidth * 0.5;
    const initialScales = [0.9, 0.75, 0.6, 0.45, 0.3, 0.15, 0.1];

    gsap.set(imagesContainer, { scale: 0 });
    maskLayers.forEach((layer, i) => gsap.set(layer, { scale: initialScales[i] }));

    const wordsTl = gsap.timeline({ paused: true });
    wordsTl.to(words, { opacity: 1, stagger: 0.04, ease: "none" });

    ScrollTrigger.create({
      trigger: banner,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(imagesContainer, { scale: p });

        const layerProgress = Math.min(p / 0.9, 1);
        maskLayers.forEach((layer, i) => {
          gsap.set(layer, {
            scale: initialScales[i] + layerProgress * (1 - initialScales[i])
          });
        });

        if (p <= 0.9) {
          const textP = p / 0.9;
          gsap.set(introWords[0], { x: -textP * moveDistance });
          gsap.set(introWords[1], { x: textP * moveDistance });
        }

        const textFade = gsap.utils.clamp(0, 1, (p - 0.85) / 0.05);
        gsap.set(introWords, { opacity: 1 - textFade });

        const headerP = gsap.utils.clamp(0, 1, (p - 0.7) / 0.2);
        wordsTl.progress(headerP);
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="project-banner-hero">
        <h1>The frame is only the beginning</h1>
      </section>

      <section className="project-banner-scroll" ref={bannerRef}>
        <div className="project-banner-img-container">
          <div className="img">
            <img src="/assets/telescope-ii/banner-img.webp" alt="Banner" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="img mask">
              <img src="/assets/telescope-ii/banner-img.webp" alt="" />
            </div>
          ))}

          <div className="project-banner-header">
            <h1>The Season Wears Confidence</h1>
          </div>
        </div>

        <div className="project-banner-intro-text-container">
          <div className="project-banner-word">
            <h1>Surface</h1>
          </div>
          <div className="project-banner-word">
            <h1>Layered</h1>
          </div>
        </div>
      </section>

      <section className="project-banner-outro">
        <h1>And that's the silhouette.</h1>
      </section>
    </div>
  );
}
