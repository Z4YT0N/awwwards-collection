/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Bebas Neue", "sans-serif"],
    },
    backgroundImage: {
      'landingImage':"url('/src/assets/images/content-image01.jpg')",
      'photograph':"url('/src/assets/images/Photo-1326x939.jpg')",
      'playFullBg':"url('/src/assets/images/Top-Viewbbcbv-1-scaled.jpg')",
      'Feature1':"url('/src/assets/images/Fyde_Illustration_Crypto_2-1326x1101.png')",
      'Feature2':"url('/src/assets/images/Vise_front2-1326x1101.jpg')",
      'Feature3':"url('/src/assets/images/PB-Front-4-1326x1101.png')",
      'Feature4':"url('/src/assets/images/Frame-3875-1326x1101.jpg')",
      'icon1':"url('/src/assets/images/logo001.svg')",
      'icon2':"url('/src/assets/images/logo002.svg')",
      'icon3':"url('/src/assets/images/logo003.png')",
    }
  },
  plugins: [],
}