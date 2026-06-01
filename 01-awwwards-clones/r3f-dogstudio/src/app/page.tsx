"use client";

import { Dog } from "@/components/dog";
import { Canvas } from "@react-three/fiber";
import { Menu, ChevronRight } from "lucide-react";

type Title = {
  small: string;
  heading: string;
  imageTitle: string;
};

const titles: Title[] = [
  {
    small: "2020 - ONGOING",
    heading: "Tomorrowland",
    imageTitle: "tomorrowland",
  },
  {
    small: "2018 - TODAY",
    heading: "Navy Pier",
    imageTitle: "navy-pier",
  },
  {
    small: "2015 - TODAY",
    heading: "MSI Chicago",
    imageTitle: "chicago",
  },
  {
    small: "2016",
    heading: "This Was Louise's Phone",
    imageTitle: "pink",
  },
  {
    small: "2012 - TODAY",
    heading: "KIKK Festival 2018",
    imageTitle: "festival",
  },
  {
    small: "2017",
    heading: "The Kennedy Center",
    imageTitle: "man",
  },
  {
    small: "2016 - ONGOING",
    heading: "Royal Opera Of Wallonia",
    imageTitle: "royal",
  },
];

export default function Home() {
  return (
    <main className="relative">
      <div className="images">
        <img id="tomorrowland" src="/models/assets/tomorrowland.png" alt="" />
        <img id="navy-pier" src="/models/assets/navy-pier.png" alt="" />
        <img id="chicago" src="/models/assets/chicago.png" alt="" />
        <img id="pink" src="/models/assets/pink.png" alt="" />
        <img id="festival" src="/models/assets/festival.png" alt="" />
        <img id="man" src="/models/assets/man.png" alt="" />
        <img id="royal" src="/models/assets/royal.png" alt="" />
      </div>
      <Canvas
        id="canvas-elem"
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Dog />
      </Canvas>

      {/* Section 1 */}
      <section
        id="section-1"
        className="relative z-10 min-h-screen w-full [--gap:5rem]"
      >
        <nav className="flex w-full items-center justify-between px-10 py-6 pt-10">
          {/* Nav Left Side */}
          <div className="flex flex-1 items-center justify-between">
            <svg
              className="h-full w-full max-w-30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 401.23099 116.838"
              aria-hidden="true"
              fill="white"
            >
              <path d="M97.9212,84.4793c0-13.21301-7.2132-23.3924-25.54961-23.3924h-19.6172v46.7851h19.6172c18.3364,0,25.54961-10.1797,25.54961-23.3927Zm-13.3478,0c0,9.2356-5.1908,12.6737-12.404,12.6737h-6.6739v-25.3474h6.6739c7.2132,0,12.404,3.4381,12.404,12.6737Z"></path>
              <path d="M100.972,107.872h37.078v-10.6516h-24.33701v-8.0222h21.37v-10.112h-21.37v-7.348h23.73v-10.6513h-36.47099v46.7851Z"></path>
              <path d="M181.211,77.3335c0-11.7973-7.55-16.2466-19.28-16.2466h-20.29199v46.7851h12.741v-14.2919h7.55099c11.73,0,19.28-4.4493,19.28-16.2466Zm-13.213,0c0,4.5841-2.157,6.47169-7.34801,6.47169h-6.26999v-12.9434h6.26999c5.19101,0,7.34801,1.8876,7.34801,6.4717Z"></path>
              <path d="M182.601,72.0079h14.76401v35.86411h12.741v-35.86411h14.763v-10.921h-42.26801v10.921Z"></path>
              <path d="M219.575,101.66c0,4.23399,3.427,7.661,7.661,7.661,4.233,0,7.694-3.427,7.694-7.661,0-4.23331-3.461-7.69421-7.694-7.69421-4.23399,0-7.661,3.4609-7.661,7.69421Zm1.478,0c0-3.4941,2.755-6.35011,6.183-6.35011,3.427,0,6.216,2.856,6.216,6.35011,0,3.495-2.789,6.31699-6.216,6.31699-3.42799,0-6.183-2.822-6.183-6.31699Zm2.58701,3.797h2.42v-2.621h1.377l1.44501,2.621h2.621l-1.74701-3.091c.806-.336,1.41101-1.243,1.41101-2.251,0-1.781-1.14201-2.6211-3.091-2.6211h-4.436v7.9631Zm5.07401-5.309c0,.639-.403,.908-1.17601,.908h-1.478v-1.6804h1.478c.77301,0,1.17601,.2016,1.17601,.7724Z"></path>
              <path d="M48.0438,24.4527C48.0438,11.1965,40.807,.98386,22.4106,.98386H2.72925V47.9216H22.4106c18.3964,0,25.6332-10.2127,25.6332-23.4689Zm-13.3915,0c0,9.2658-5.2078,12.7152-12.4446,12.7152h-6.6957V11.7376h6.6957c7.2368,0,12.4446,3.4493,12.4446,12.7151Z"></path>
              <path d="M99.8921,24.4527C99.8921,9.84386,90.8292,.17226,75.2734,.17226s-24.6186,9.6716-24.6186,24.28044,9.0629,24.2805,24.6186,24.2805,24.6187-9.6716,24.6187-24.2805Zm-13.4591,0c0,7.8455-4.2609,13.5944-11.1596,13.5944s-11.1595-5.7489-11.1595-13.5944,4.2609-13.5943,11.1595-13.5943,11.1596,5.7488,11.1596,13.5943Z"></path>
              <path d="M175.40601,48.7332c12.715,0,20.696-5.9517,20.696-15.4205,0-7.7102-5.073-11.7006-12.98601-13.3238l-10.145-2.0966c-4.058-.8116-5.27499-2.0967-5.27499-4.1933,0-2.2996,2.367-4.1933,6.62801-4.1933,4.73399,0,8.183,2.029,8.52199,6.2899h12.57901c0-11.22716-9.468-15.62334-21.16901-15.62334-11.22699,0-19.411,5.61359-19.411,14.74414,0,7.7102,5.073,11.7006,12.98599,13.3238l10.145,2.0967c4.058,.8116,5.27501,2.0966,5.27501,4.1932,0,2.9759-2.908,4.6668-7.507,4.6668-5.20801,0-8.99501-2.7054-9.26601-7.575h-12.58c.27101,10.5508,7.44,17.1113,21.50801,17.1113Z"></path>
              <path d="M196.80901,11.9405h14.812V47.9216h12.782V11.9405h14.812V.98386h-42.40599V11.9405Z"></path>
              <path d="M263.302,48.7332c13.59399,0,21.16901-6.1547,21.16901-20.4254V.98386h-12.78302V28.3078c0,6.29-3.17899,9.5364-8.38599,9.5364-5.276,0-8.455-3.2464-8.455-9.5364V.98386h-12.782V28.3078c0,14.2707,7.575,20.4254,21.237,20.4254Z"></path>
              <path d="M332.995,24.4527c0-13.2562-7.237-23.46884-25.633-23.46884h-19.68201V47.9216h19.68201c18.396,0,25.633-10.2127,25.633-23.4689Zm-13.39099,0c0,9.2658-5.20801,12.7152-12.44501,12.7152h-6.69598V11.7376h6.69598c7.237,0,12.44501,3.4493,12.44501,12.7151Z"></path>
              <path d="M335.90399,47.9216h12.78302V.98386h-12.78302V47.9216Z"></path>
              <path d="M401.23099,24.4527c0-14.60884-9.06299-24.28044-24.61899-24.28044s-24.61899,9.6716-24.61899,24.28044,9.06299,24.2805,24.61899,24.2805,24.61899-9.6716,24.61899-24.2805Zm-13.45999,0c0,7.8455-4.26001,13.5944-11.159,13.5944s-11.16-5.7489-11.16-13.5944,4.26102-13.5943,11.16-13.5943,11.159,5.7488,11.159,13.5943Z"></path>
              <path d="M128.905,30.638h10.41501c-1.21701,4.802-5.74901,7.5074-11.22701,7.5074-7.169,0-11.904-5.2754-11.904-13.8649,0-7.8455,4.32899-13.5944,11.769-13.5944,4.464,0,8.31899,1.8938,9.40099,6.1547h13.59401c-1.48801-10.68614-10.88901-16.8408-23.26601-16.8408-15.758,0-24.95699,9.67161-24.95699,24.2805,0,14.6765,9.46899,24.2805,22.184,24.2805,7.237,0,11.76801-2.7054,14.88-6.5605v5.7489h11.29399V21.3046h-22.183v9.3334Z"></path>
              <path d="M30.4351,61.1758h-10.4155L0,116.838H10.3479L30.4351,61.1758Z"></path>
            </svg>

            {/* Navbar Middle */}
            <div className="flex items-center gap-2">
              <ChevronRight className="text-red-600" size={20} />
              <span className="text-xs">Our Showreel</span>
            </div>
          </div>

          {/* Navbar Right */}
          <div className="flex flex-1 justify-end">
            <Menu size={22} />
          </div>
        </nav>

        {/* Middle */}
        <div className="flex gap-10">
          <div className="flex w-[53%] items-center justify-end py-28">
            <h1 className="text-right text-[5rem] leading-[0.9] font-semibold">
              WE <br /> MAKE <br /> GOOD <br /> SHIT
            </h1>
          </div>
          <div className="right w-1/2"></div>
        </div>

        {/* Bottom */}
        <div className="ms-30 mt-40 flex gap-10">
          <div className="left w-1/2" />
          <div className="right w-1/2">
            <p className="leading-normal font-extralight">
              Dogstudio is a multidisciplinary <br /> creative studio at the
              intersection <br /> of art, design and technology.
            </p>
          </div>
        </div>

        {/* Absolute Lines */}
        <div className="first-line absolute h-px w-[35rem] translate-y-[-17rem] rotate-45 bg-red-500/40"></div>
        <div className="second-line absolute top-[28%] right-[12%] h-px w-[10rem] rotate-[135deg] bg-red-500/40"></div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="relative z-10 min-h-screen pt-40">
        <div className="titles flex flex-col px-40">
          {titles.map((title: Title) => (
            <div
              key={title.small}
              img-title={title.imageTitle}
              className="title flex gap-12 px-4 py-10 opacity-30 transition-all duration-300 hover:opacity-100"
            >
              {/* Small label */}
              <div className="w-40">
                <small className="block cursor-pointer text-xs leading-tight tracking-wide uppercase">
                  {title.small}
                </small>
              </div>

              {/* Heading */}
              <h1 className="cursor-pointer text-6xl leading-none font-medium">
                {title.heading}
              </h1>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 */}

      <section
        id="section-3"
        className="relative flex min-h-screen justify-between px-40 py-48 pt-80"
      >
        <div className="relative z-0 w-1/2 pr-20 text-center">
          <h3 className="text-6xl font-medium opacity-80">
            We're crafting <br />
            emotional <br />
            experiences <br />
            aimed at <br />
            improving <br />
            results
          </h3>

          {/* Decorative line */}
          <div className="absolute top-[70%] right-10 h-px w-[18rem] rotate-[-45deg] bg-red-500/40" />
        </div>

        <div className="relative z-10 flex w-1/2 max-w-xl flex-col gap-10">
          <p className="text-sm leading-relaxed font-light opacity-60">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis.
          </p>

          <p className="text-sm leading-relaxed font-light opacity-60">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis.
          </p>
        </div>
      </section>
    </main>
  );
}
