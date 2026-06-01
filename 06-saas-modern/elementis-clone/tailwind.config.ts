import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      lg: '1240px',
      md: '960px',
      sm: '640px',
      xs: '380px'
    },
    extend: {
      fontFamily: {
        geist: "Geist",
        geist_mono: "Geist Mono",
        inter: "Inter",
        open_sans: "Open Sans",
      },
      fontWeight: {
        normal: '400'
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(.24, .43, 0.15, .97)"
      },
      animation: {
        translateRight: "translate_right 10s linear infinite"
      },
      keyframes: {
        translate_right: {
          from: {
            transform: 'translateX(0)'
          },
          to: {
            transform: 'translateX(-100%)'
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
