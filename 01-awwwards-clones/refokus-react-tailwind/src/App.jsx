import React from "react";
import Navbar from "./Components/Navbar";
import Work from "./Components/Work";
import Stripes from "./Components/Stripes";
import Products from "./Components/Products";
import Marquees from "./Components/Marquees";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";
import LocomotiveScroll from 'locomotive-scroll';
import Cursor from "./Components/Cursor";


function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <>
      <div className="w-full h-full bg-black text-white">
        <Cursor />
        <Navbar />
        <Work />
        <Stripes />
        <Products />
        <Marquees />
        <Cards />
        <Footer />
      </div>
    </>
  );
}

export default App;
