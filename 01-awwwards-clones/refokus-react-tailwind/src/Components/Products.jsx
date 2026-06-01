import React, { useState } from "react";
import Product from "./Product";
import { motion } from "framer-motion";

function Products() {
  const products = [
    {
      title: "arqitel",
      description:
        "With a continuous 3D animation, we showcase Arqitel approach and show how migration data translates into real estate.",
      live: true,
      case: false,
      video: "https://cdn.refokus.com/website/Arqitel/Arqitel%20project%20video%204_3.webm",
      placeholder: "https://cdn.prod.website-files.com/6334198f239547f2fccd84c1/650c5f15978b05dc7f2ae554_14.webp",
    },
    {
      title: "cula",
      description:
        "We immersed ourselves in a 3D world we created to explain how Cula's platform collects data from carbon removal processes and converts them into carbon credit certificates.",
      live: true,
      case: false,
      video: "https://cdn.refokus.com/website/Cula_promo_new_4_3.mp4",
      placeholder: "https://cdn.prod.website-files.com/6334198f239547f2fccd84c1/65b41324914b470b20ec7d03_Frame%203.png",
    },
    {
      title: "Yahoo!",
      description:
        "An interactive learning game that can educate and entertain you on the basics of web layouts in Webflow.",
      live: true,
      case: false,
      video: "https://cdn.refokus.com/website/2022/videos/yahoo.webm",
      placeholder: "https://cdn.prod.website-files.com/6334198f239547f2fccd84c1/65b41cd5ec5fbe7d560d053f_Yahoo%20-%20mobile.png",
    },
    {
      title: "TTR",
      description:
        "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design.",
      live: true,
      case: true,
      video: "https://cdn.refokus.com/website/TTR/TTR%20project%20video%204_3_H.264.webm",
      placeholder: "https://cdn.prod.website-files.com/6334198f239547f2fccd84c1/64cd6ecc885579ba1b4ffc97_10.jpg",
    },
    {
      title: "maniv",
      description:
        "A global early-stage venture fund partnering with founders to advance cleaner, safer, and more sustainable movement of people and goods.",
      live: true,
      case: true,
      video: "https://cdn.refokus.com/website/Maniv-Compressed.mp4",
      placeholder: "https://cdn.prod.website-files.com/6334198f239547f2fccd84c1/65b2cab86e8df24e528c4441_Frame%201.png",
    },
  ];

  const [pos, setPos] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(products[0].video);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(products[0].placeholder);
  const [isHovered, setIsHovered] = useState(false);

  const mover = (val) => {
    setPos(val * 23);
    setCurrentVideo(products[val].video);
    setCurrentPlaceholder(products[val].placeholder);
    setIsVideoLoaded(false);
    setIsHovered(true); // Show video container on hover
  };

  return (
    <div className="mt-32 relative">
      {products.map((val, index) => (
        <Product
          val={val}
          mover={mover}
          count={index}
          key={index}
          setIsHovered={setIsHovered}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.5 }}
        className="absolute w-full h-full top-0 pointer-events-none"
      >
        <motion.div
          initial={{ y: pos, x: "-50%" }}
          animate={{ y: pos + `rem` }}
          className="window absolute w-[32rem] h-[23rem] left-[45%] rounded-xl bg-white overflow-hidden"
        >
          {!isVideoLoaded && (
            <img
              src={currentPlaceholder}
              alt="Loading..."
              className="w-full h-full object-cover"
            />
          )}
          <video
            src={currentVideo}
            autoPlay
            muted
            loop
            className={`w-full h-full object-cover ${!isVideoLoaded ? "hidden" : ""}`}
            onLoadedData={() => setIsVideoLoaded(true)}
          ></video>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Products;
