import gsap, { Expo, Linear, ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";

const Images = () => {
  const position = [
    {
      video:
        "https://a.storyblok.com/f/133769/x/9c433c7aac/home-news-diesel-be-a-follower.mp4",
      right: "right-[80%]",
      top: "top-[30%]",
      height: "h-[30%]",
      width: "w-[100%]",
    },
    {
      image:
        "https://a.storyblok.com/f/133769/348x494/21becfd449/home-news-3.jpg/m/550x781/filters:format(webp):quality(70)",
      right: "-right-[40%]",
      top: "top-[10%]",
      height: "h-[35%]",
      width: "w-[50%]",
    },
    {
      image:
        "https://a.storyblok.com/f/133769/758x508/8a1ff60d00/home-news-4.jpg/m/550x369/filters:format(webp):quality(70)",
      right: "right-[90%]",
      top: "top-[90%]",
      height: "h-[40%]",
      width: "w-[120%]",
    },
    {
      video:
        "https://a.storyblok.com/f/133769/x/88b4bf7989/news-rino-pelle.mp4",
      right: "-right-[90%]",
      top: "top-[86%]",
      height: "h-[50%]",
      width: "w-[100%]",
    },
  ];

    useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".images-section",
          scroller: "body",
          start: "top 30%",
          end: "top -200%",
          scrub: true,
        },
        defaults: {
          ease: Expo.inOut,
        },
      });

      tl.to(".images:nth-child(1) video", {
        x: "-50%",
        y: "-100%"
      }, 'a')
      .to(".images:nth-child(2) img", {
        x: "90%",
        y: "-50%"
      }, 'a')
      .to(".images:nth-child(3) img", {
        x: "-50%",
        y: "-50%"
      }, 'a')
      .to(".images:nth-child(4) video", {
        x: "50%",
        y: "-50%"
      }, 'a')
    }, []);

  return (
    <div className="images-section w-full h-[70vh] sm:h-[180vh] overflow-hidden flex items-center justify-center">
      <div className="relative w-1/3 sm:w-1/4 h-1/2">
        {position.map((item, index) => {
          return (
            <div
              className={`images absolute ${item.height} ${item.width} ${item.top} ${item.right}`}
              id={index}
              key={index}
            >
              {item.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={item.image}
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  src={item.video}
                ></video>
              )}
            </div>
          );
        })}

        <img
          className="h-full w-full object-cover"
          src="https://a.storyblok.com/f/133769/748x1278/5784aa7150/home-news-1.jpg/m/550x940/filters:format(webp):quality(70)"
          alt=""
        />
      </div>
    </div>
  );
};

export default Images;
