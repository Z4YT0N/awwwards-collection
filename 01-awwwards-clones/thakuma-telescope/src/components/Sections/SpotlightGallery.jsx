import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  { name: "FFFFFound MMMMood",    img: "/assets/telescope-i/back.webp" },
  { name: "Japanese Mini Trucks", img: "/assets/telescope-i/2.webp" },
  { name: "Listening Rooms",      img: "/assets/telescope-i/3.webp" },
  { name: "Watchlist",            img: "/assets/telescope-i/4.webp" },
  { name: "Cycling Fits",         img: "/assets/telescope-i/5.webp" },
  { name: "Midjourney Inspo",     img: "/assets/telescope-i/6.webp" },
  { name: "Porto City Guide",     img: "/assets/telescope-i/7.webp" },
  { name: "Bookmarked",           img: "/assets/telescope-i/8.webp" },
  { name: "Montreal Bakeries",    img: "/assets/telescope-i/9.webp" },
  { name: "Party Couture",        img: "/assets/telescope-i/10.webp" },
  { name: "Perfect Vessels",      img: "/assets/telescope-i/0.webp" },
  { name: "Dream Interiors",      img: "/assets/telescope-i/1.webp" },
];

export default function SpotlightGallery() {
  const containerRef = useRef();
  const spotlightRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const spotlight = spotlightRef.current;
    const introTexts = spotlight.querySelectorAll(".spotlight-arc-intro-text");
    const bgImgContainer = spotlight.querySelector(".spotlight-arc-bg-img");
    const bgImg = spotlight.querySelector(".spotlight-arc-bg-img img");
    const titlesContainer = spotlight.querySelector(".spotlight-arc-titles");
    const titles = titlesContainer.querySelectorAll("h1");
    const imagesContainer = spotlight.querySelector(".spotlight-arc-images");
    const imageWraps = spotlight.querySelectorAll(".spotlight-arc-img");
    const header = spotlight.querySelector(".spotlight-arc-header");
    const arcContainer = spotlight.querySelector(".spotlight-arc-titles-container");

    const gap = 0.08;
    const speed = 0.3;
    const arcRadius = 500;

    const arcX = (window.innerWidth * 0.3) - 220;
    const arcYStart = -200;
    const arcYEnd = window.innerHeight + 200;

    const getBezierPos = (t) => ({
      x: (1 - t) ** 2 * arcX + 2 * (1 - t) * t * (arcX + arcRadius) + t ** 2 * arcX,
      y: (1 - t) ** 2 * arcYStart + 2 * (1 - t) * t * (window.innerHeight / 2) + t ** 2 * arcYEnd,
    });

    const getImgProgress = (idx, progress) => {
      const s = idx * gap;
      const e = s + speed;
      if (progress < s) return -1;
      if (progress > e) return 2;
      return (progress - s) / speed;
    };

    gsap.set(imageWraps, { opacity: 0 });

    ScrollTrigger.create({
      trigger: spotlight,
      start: "top top",
      end: `+=${window.innerHeight * 10}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        if (p <= 0.2) {
          const t = p / 0.2;
          const dist = window.innerWidth * 0.6;
          gsap.set(introTexts[0], { x: -t * dist, opacity: 1 });
          gsap.set(introTexts[1], { x: t * dist, opacity: 1 });
          gsap.set(bgImgContainer, { scale: t });
          gsap.set(bgImg, { scale: 1.5 - t * 0.5 });
          gsap.set(imageWraps, { opacity: 0 });
          header.style.opacity = "0";
          arcContainer.style.setProperty("--before-opacity", "0");
          arcContainer.style.setProperty("--after-opacity", "0");
          return;
        }

        if (p > 0.25 && p < 0.95) {
          header.style.opacity = "1";
          arcContainer.style.setProperty("--before-opacity", "1");
          arcContainer.style.setProperty("--after-opacity", "1");

          const scrollP = (p - 0.25) / 0.7;
          const vh = window.innerHeight;
          const totalH = titlesContainer.scrollHeight;
          const y = vh - scrollP * (vh + totalH);
          gsap.set(titlesContainer, { y });

          imageWraps.forEach((wrap, i) => {
            const imgP = getImgProgress(i, scrollP);
            if (imgP < 0 || imgP > 1) {
              gsap.set(wrap, { opacity: 0 });
            } else {
              const pos = getBezierPos(imgP);
              gsap.set(wrap, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
            }
          });

          let closest = 0;
          let minDist = Infinity;
          titles.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const d = Math.abs((rect.top + rect.height / 2) - vh / 2);
            if (d < minDist) { minDist = d; closest = i; }
          });

          if (closest !== activeIndex) {
            setActiveIndex(closest);
            titles.forEach((t, i) => t.style.opacity = i === closest ? "1" : "0.25");
            bgImg.src = GALLERY_ITEMS[closest].img;
          }
        }

        if (p > 0.95) {
          header.style.opacity = "0";
          arcContainer.style.setProperty("--before-opacity", "0");
          arcContainer.style.setProperty("--after-opacity", "0");
        }
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="spotlight-arc-intro">
        <h1>A curated series of surreal frames</h1>
      </section>

      <section className="spotlight-arc-section" ref={spotlightRef}>
        <div className="spotlight-arc-intro-text-wrapper">
          <div className="spotlight-arc-intro-text">Beneath</div>
          <div className="spotlight-arc-intro-text">Beyond</div>
        </div>

        <div className="spotlight-arc-bg-img">
          <img src={GALLERY_ITEMS[0].img} alt="Background" />
        </div>

        <div className="spotlight-arc-titles-container">
          <div className="spotlight-arc-titles">
            {GALLERY_ITEMS.map((item, idx) => (
              <h1 key={idx}>{item.name}</h1>
            ))}
          </div>
        </div>

        <div className="spotlight-arc-images">
          {GALLERY_ITEMS.map((item, idx) => (
            <div key={idx} className="spotlight-arc-img">
              <img src={item.img} alt={item.name} />
            </div>
          ))}
        </div>

        <div className="spotlight-arc-header">Discover</div>
      </section>

      <section className="spotlight-arc-outro">Moments in still motion.</section>
    </div>
  );
}
