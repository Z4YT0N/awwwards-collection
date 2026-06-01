import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(preloader) {
  useEffect(() => {
    if (!preloader) return;
    const scrollEl = document.querySelector("#main-container");
    let locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
    });

    locoScroll.on("scroll", () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTop(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTop(value, 0, 0)
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
    });

    const isUpdate = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    ScrollTrigger.addEventListener("refresh", isUpdate);
    ScrollTrigger.refresh();

    return () => {
      if(locoScroll){
        ScrollTrigger.removeEventListener("refresh", isUpdate);
        locoScroll.destroy();
        locoScroll=null;
      }
    }
  }, [preloader]);
}
