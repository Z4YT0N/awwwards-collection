import type { Config } from "tailwindcss";
import fluid, {
  extract,
  screens,
  fontSize,
  FluidThemeConfig,
} from "fluid-tailwind";

export default {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    fluid: (({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.lg")],
    })) satisfies FluidThemeConfig,
    screens,
    fontSize,
    extend: {
      fontFamily: {
        sans: ["var(--font-bowlby-sc)"],
        mono: ["var(--font-dm-mono)"],
      },
      colors: {
        "brand-blue": "#4876ff",
        "brand-lime": "#d9f154",
        "brand-navy": "#2e3192",
        "brand-orange": "#ff7347",
        "brand-pink": "#f7d0e9",
        "brand-purple": "#692e54",
        "brand-gray": "#fffdf9",
      },
      keyframes: {
        squiggle: {
          "0%": { filter: 'url("#squiggle-0")' },
          "25%": { filter: 'url("#squiggle-1")' },
          "50%": { filter: 'url("#squiggle-2")' },
          "75%": { filter: 'url("#squiggle-3")' },
          "100%": { filter: 'url("#squiggle-4")' },
        },
      },
      animation: {
        squiggle: "squiggle .5s infinite",
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
