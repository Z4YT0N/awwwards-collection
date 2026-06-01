import React from "react";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Ingre from "./components/Ingre/Ingre";
import Last from "./components/Last/Last";
import Video from "./components/Video/Video";


const App = () => {
  return (
    <div>
      <Home/>
      <About/>
      <Video/>
      <Ingre/>
      <Last/>
      <Footer/>
    </div>
  );
};

export default App;

