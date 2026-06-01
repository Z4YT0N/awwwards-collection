<div >
 <br />
  <div align="center" >
   <a href="https://youtu.be/pqYxZ8jd768" target="_blank">
     <img  src="public/images/Final.png" style="border-radius:10px;"  alt="Project Banner">
   </a></div>
 <br />
 <br />

 <div>
   <img src="https://img.shields.io/badge/-React_JS_V19-black?style=for-the-badge&logoColor=white&logo=react&color=007ACC" alt="react.js" />
   <img src="https://img.shields.io/badge/-Tailwind_CSS_v4-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=030712" alt="tailwindcss" />
   <img src="https://img.shields.io/badge/-GSAP-black?style=for-the-badge&logoColor=white&logo=greensock&color=88CE02" alt="greensock" />

 </div>

 <h3 style="font-weight:700;font-size:30px;">AWWWARDS Site of the Day Website</h3>

  <div >
    Ready to build a website that has won an Awwwards Site of the Day?
    This tutorial guides you through creating a stunning, interactive site using <b>GSAP</b>, <b>ReactJS</b>, and <b>Tailwind CSS</b>.
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🌐 [Community](#more)

## Introduction

Dive into creating a cutting-edge web experience designed for Awwwards recognition, with **GSAP (GreenSock Animation Platform)** at its core. This project demonstrates how to leverage GSAP's powerful animation capabilities to craft fluid transitions, captivating scroll effects, and dynamic UI interactions, combining it with React and Tailwind CSS for a truly immersive and visually stunning website.

## Tech Stack

- ⚛️ React 19
- 🌀 Tailwind CSS v4
- 🎞️ GSAP (GreenSock Animation Platform)

## Features

In this course, You’ll learn how to:

- ✨ Parallax Like a Pro
- ⚡️ Master Clip-Path Magic
- 🕹️ Control ScrollTrigger & ScrollSmoother
- 😉 Pin Elements with Style
- 🧑‍💻 Reveal Text Like Awwwards Pros
- 👏 Build GSAP Timelines that Actually Feel Good
- 📱 It's Fully responsive and mobile-friendly

## Quick Start

```bash
# 1. Clone the repo
git clone [https://github.com/FullStackEmpire/gsap-awwwards-website.git](https://github.com/FullStackEmpire/gsap-awwwards-website.git)

# 2. Install dependencies
npm install
# or
yarn

# 3. Start the dev server
npm run dev
# or
yarn dev
```

## Snippets (Code to Copy)

<details>
  <summary>index.css</summary>

```css
@import url("https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap");
@import "tailwindcss";

@font-face {
  font-family: "ProximaNova, sans-serif";
  src: url("/fonts/ProximaNova-Regular.otf");
}

@theme {
  --color-black: #222123;
  --color-main-bg: #232224;
  --color-white: #ffffff;
  --color-dark-brown: #523122;
  --color-mid-brown: #a26833;
  --color-light-brown: #e3a458;
  --color-red-brown: #7f3b2d;
  --color-yellow-brown: #a26833;
  --color-milk-yellow: #e3d3bc;
  --color-red: #a02128;
  --color-milk: #faeade;
  --font-sans: "Antonio", sans-serif;
  --font-paragraph: "ProximaNova, sans-serif";
}

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #faeade;
  color: #523122;
  font-family: "Antonio", sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

body::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

@layer utilities {
  .flex-center {
    @apply flex justify-center items-center;
  }
  .col-center {
    @apply flex flex-col justify-center items-center;
  }
  .abs-center {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
  }
  .general-title {
    @apply 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw];
  }
}

@layer components {
  .paragraph-line {
    @apply text-nowrap overflow-hidden;
  }

  .hero-container {
    @apply relative bg-milk w-screen h-dvh overflow-hidden;

    .hero-content {
      @apply relative z-10 w-full h-full flex flex-col 2xl:justify-center items-center translate-y-10 2xl:pt-0 md:pt-32 pt-24;

      .hero-title {
        @apply text-dark-brown 2xl:text-[8.5rem] md:text-[6.5rem] text-[3.3rem] font-bold uppercase leading-[9vw] tracking-[-.35vw] 2xl:mb-0 mb-5;
      }

      .hero-text-scroll {
        @apply rotate-[-3deg] mb-8 border-[.5vw] border-milk;

        .hero-subtitle {
          @apply bg-mid-brown;
        }

        h1 {
          @apply uppercase 2xl:text-[8.5rem] md:text-[6.5rem] text-[3.3rem] font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3;
        }
      }

      h2 {
        @apply font-paragraph text-dark-brown text-center md:max-w-lg max-w-sm px-5 md:text-lg leading-[115%] mt-3;
      }

      .hero-button {
        @apply md:mt-16 mt-10 text-dark-brown bg-light-brown uppercase font-bold text-lg rounded-full md:p-5 p-3 md:px-16 px-10;
      }
    }
  }

  .message-content {
    @apply bg-[#7f3b2d] text-milk min-h-dvh overflow-hidden flex justify-center items-center relative z-20;

    .msg-wrapper {
      @apply 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw] flex flex-col justify-center items-center md:gap-24 gap-14;

      h1:first-of-type {
        @apply 2xl:max-w-4xl md:max-w-2xl max-w-xs text-center  text-[#faeade10];
      }

      h1:last-of-type {
        @apply 2xl:max-w-7xl md:max-w-4xl max-w-xs text-center  text-[#faeade10];
      }
    }

    p {
      @apply text-center font-paragraph;
    }

    h1,
    h2 {
      @apply leading-none;
    }

    .msg-text-scroll {
      @apply rotate-[3deg] 2xl:translate-y-5 -translate-y-5 absolute z-10 border-[.5vw] border-[#7f3b2d];
    }
  }

  .flavor-section {
    @apply min-h-dvh bg-milk;

    .flavor-text-scroll {
      @apply rotate-[-3deg] md:translate-y-5 border-[.5vw] border-milk absolute z-10;
    }

    .first-text-split h1 {
      @apply md:text-center text-dark-brown;
    }

    .second-text-split h1 {
      @apply md:text-center;
    }

    .slider-wrapper {
      @apply lg:h-dvh min-h-dvh md:min-h-fit w-full mt-0 md:mt-20 xl:mt-0;

      .flavors {
        @apply h-full w-full flex md:flex-row flex-col items-center 2xl:gap-72 lg:gap-52 md:gap-24 gap-7 flex-nowrap;

        .drinks {
          @apply absolute left-1/2 -translate-x-1/2 bottom-0 md:h-full h-80;
        }

        .elements {
          @apply absolute md:top-0 md:bottom-auto bottom-10 w-full;
        }

        h1 {
          @apply absolute md:bottom-10 md:left-10 bottom-5 left-5 text-milk md:text-6xl text-3xl font-semibold uppercase tracking-tighter;
        }
      }
    }
  }

  .nutrition-section {
    @apply min-h-dvh 2xl:h-[120dvh] overflow-hidden relative;

    .big-img {
      @apply w-full absolute 2xl:h-full md:h-2/3 h-1/2 left-0 bottom-0 object-bottom 2xl:object-contain object-cover;
    }

    .nutrition-title {
      @apply 2xl:max-w-4xl xl:max-w-2xl md:py-0 py-3 md:pb-5 pb-0 lg:pb-0 md:text-center text-[#513022];
    }

    .nutrition-text-scroll {
      @apply rotate-[-3deg] border-[.5vw] border-[#e3d3bc] text-nowrap opacity-0 md:-mt-32 -mt-24;
    }

    .nutrition-box {
      @apply absolute md:bottom-16 bottom-5 w-full md:px-0 px-5;

      .list-wrapper {
        @apply bg-[#fdebd2] rounded-full border-[.5vw] border-[#e8ddca] mx-auto max-w-7xl md:py-8 py-5 md:px-0 px-5 flex justify-between items-center;

        p {
          @apply text-[#865720];
        }
      }

      .spacer-border {
        @apply absolute right-0 top-1/2 transform -translate-y-1/2 md:h-24 h-16 w-px bg-[#C89C6E];
      }
    }
  }

  .benefit-section {
    @apply min-h-dvh bg-[#222123] overflow-hidden relative;

    p {
      @apply text-milk font-paragraph text-center text-lg;
    }

    .first-title {
      @apply rotate-[3deg] relative z-10;
    }

    .second-title {
      @apply rotate-[-1deg] md:-translate-y-5;
    }

    .third-title {
      @apply rotate-[1deg] md:-translate-y-12 relative z-10;
    }

    .fourth-title {
      @apply rotate-[-5deg] md:-translate-y-12;
    }

    .vd-pin-section {
      @apply md:h-[110vh] h-dvh overflow-hidden md:!-translate-y-[15%] md:mt-0 mt-20;

      video {
        @apply size-full absolute inset-0 object-cover;
      }

      .play-btn {
        @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[9vw] flex justify-center items-center bg-[#ffffff1a] backdrop-blur-xl rounded-full;
      }

      img:first-of-type {
        @apply size-[15vw];
      }
    }
  }

  .testimonials-section {
    @apply bg-milk relative w-full h-[120dvh];

    .pin-box {
      @apply flex items-center justify-center w-full ps-52 absolute 2xl:bottom-32 bottom-[50vh];

      .vd-card {
        @apply md:w-96 w-80 flex-none md:rounded-[2vw] rounded-3xl -ms-44 overflow-hidden 2xl:relative absolute border-[.5vw] border-milk;
      }
    }

    h1 {
      @apply uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] font-bold;
    }
  }

  .footer-section {
    @apply 2xl:min-h-dvh overflow-hidden relative bg-[#222123];

    .social-btn {
      @apply border border-[#faeade33] md:size-[5vw] size-14 md:p-0 p-3 flex justify-center items-center rounded-full hover:bg-[#ffffff1a] transition-colors cursor-pointer;
    }

    input {
      @apply 2xl:text-4xl text-3xl placeholder:font-bold placeholder:tracking-tighter;
    }

    .copyright-box {
      @apply 2xl:absolute w-full md:px-10 px-5 py-7 bottom-0 text-milk opacity-50 md:text-lg font-paragraph flex gap-7 md:flex-row flex-col-reverse md:justify-between justify-center items-center;

      p {
        @apply text-center;
      }
    }
  }
}

.nutrition-section {
  background-color: #faeade00;
  background-image: radial-gradient(circle, #f3ece2, #dcccb0);
}

.spin-circle {
  animation: spin 20s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

</details>

<details>
  <summary>constants/index.js</summary>

```js
const flavorlists = [
  {
    name: "Chocolate Milk",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Stawberry Milk",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Cookies & Cream",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Peanut Butter Chocolate",
    color: "orange",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Vanilla Milkshake",
    color: "white",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Max Chocolate Milk",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
  },
];

const nutrientLists = [
  { label: "Potassium", amount: "245mg" },
  { label: "Calcium", amount: "500mg" },
  { label: "Vitamin A", amount: "176mcg" },
  { label: "Vitamin D", amount: "5mcg" },
  { label: "Iron", amount: "1mg" },
];

const cards = [
  {
    src: "/videos/f1.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Madison",
    img: "/images/p1.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f2.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Alexander",
    img: "/images/p2.png",
  },
  {
    src: "/videos/f3.mp4",
    rotation: "rotate-z-[-4deg]",
    name: "Andrew",
    img: "/images/p3.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f4.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Bryan",
    img: "/images/p4.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f5.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Chris",
    img: "/images/p5.png",
  },
  {
    src: "/videos/f6.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Devante",
    img: "/images/p6.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f7.mp4",
    rotation: "rotate-z-[-3deg]",
    name: "Melisa",
    img: "/images/p7.png",
    translation: "translate-y-[10%]",
  },
];

export { flavorlists, nutrientLists, cards };
```

</details>

## Assets

- 🎥 Videos: [`/public/videos`](https://github.com/Fullstack-Empire/GSAP-Awwwards-Website/tree/main/public/videos)
- 📚 Fonts: [`/public/fonts`](https://github.com/Fullstack-Empire/GSAP-Awwwards-Website/tree/main/public/fonts)
- 🖼️ Images: [`/public/images`](https://github.com/Fullstack-Empire/GSAP-Awwwards-Website/tree/main/public/images)

## Community

Join the community and connect with other developers!

[![Discord](https://img.shields.io/discord/your-server-id?label=Join%20Discord&logo=discord&style=for-the-badge&color=5865F2)](https://discord.gg/cbtfr4BHF9)
