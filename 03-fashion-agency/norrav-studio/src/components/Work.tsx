"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

import { useEffect, useRef } from "react";

const services: Service[] = [
  {
    id: 1,
    title: "Branding",
    description:
      "We craft brand identities that spark recognition and loyalty — from strategy to storytelling.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dA0VGEbbw4g",
    },
    services: [
      ["Brand architecture", "Brand positioning", "Naming", "Brand strategy"],
      ["Brand development", "Brand identity", "Implementation", "Wayfinding"],
      ["Iconography", "Illustration", "3D", "Print"],
    ],
  },
  {
    id: 2,
    title: "Digital Branding",
    description:
      "We design immersive digital experiences that blend UX, UI, and tech into one seamless journey.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/lJIrF4YjHfQ", // ✅ embed format
    },
    services: [
      ["User Experience", "User Interface", "Prototyping", "Web design"],
      ["App design", "E-commerce", "Front-end", "Back-end"],
     
    ],
  },
  {
    id: 3,
    title: "Creative Design",
    description:
      "Bold, memorable visuals that move people — from packaging to 3D storytelling.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/9No-FiEInLA", // ✅ embed format
    },
    services: [
      ["Graphic Design", "Illustration",  "3D Design"],
      ["Packaging", "Editorial ", "Iconography", "Collateral"],

    ],
  },
  {
    id: 4,
    title: "Motion & Video",
    description:
      "Stories in motion — from cinematic ads to branded animations that stay unforgettable.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ✅ embed format
    },
    services: [
      ["Motion graphics", "2D/3D Animation", "Explainers", ],
      ["Advertising", " storytelling"],
    ],
  },
];


const Work = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".title span", {
      y: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="relative z-[400] h-fit p-4">
      {/* heading */}
      <h2 className="text-3xl max-w-[950px] overflow-hidden title">
        <span className="block">What We Do</span>
      </h2>

      {/* card-container */}
      <div className="min-h-screen ">
        {services.map((service) => (
          <Card key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Work;

type Service = {
  id: number;
  title: string;
  description: string;
  media: {
    type: "image" | "video";
    url: string;
  };
  services: string[][];
};

const Card: React.FC<Service> = ({
  id,
  title,
  description,
  media,
  services,
}) => {
  return (
    <div className="sticky top-0 left-0 bg-background  h-screen flex flex-col lg:flex-row justify-between my-5 p-2 md:p-4 overflow-hidden">
      {/* Left Side */}
      <div className="flex-[0.3] md:flex-[0.4] flex flex-row justify-between items-start p-2">
        <h2 className="text-7xl md:text-9xl font-medium">{id}</h2>
        <h4 className="text-xl">{title}</h4>
      </div>

      {/* Right Side */}
      <div className="flex-[0.7] md:flex-[0.4] flex flex-col justify-between items-start gap-7 md:gap-3 mt-6 md:mt-0">
        {/* Description */}
        <p className="text-2xl sm:text-3xl">{description}</p>

        {/* Image or Video */}
        {media.type === "image" ? (
          <Image
            src={media.url}
            alt={title}
            className="h-[200px] w-[300px] object-cover"
          />
        ) : (
          <iframe
            src={`${
              media.url
            }?autoplay=1&mute=1&controls=0&loop=1&playlist=${media.url
              .split("/")
              .pop()}`}
            title={title}
            className="h-[200px] w-[300px] object-cover mt-5"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Services in chunks of 4 */}
        <div className="flex justify-start flex-wrap gap-8  mt-8 md:mt-5">
          {services.map((group, i) => (
            <ul key={i} className="text-light">
              {group.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
