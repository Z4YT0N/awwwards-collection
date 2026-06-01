import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Featured from "./components/Featured";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

import "./styles/home.scss";
import "./styles/reset.scss";
import useLocoScroll from "./hooks/useLocoScroll";

function App() {
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(3);

  useLocoScroll(!preloader);

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
    setPreloader(false);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  return (
    <>
      {preloader ? (
        <div className="loader-wrapper absolute">
          <h1>Sanbulb Agency</h1>
          <h2>Cozumel</h2>
        </div>
      ) : (
        <div
          className="main-container"
          id="main-container"
          data-scroll-container
        >
          <Navbar />
          <Header />
          <Featured />
          <About />
          <Gallery />
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
}

export default App;
