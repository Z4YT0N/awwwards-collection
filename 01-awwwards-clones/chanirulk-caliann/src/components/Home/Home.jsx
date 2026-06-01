import "./home.css";
import A from "../img/svg.png";
import B from "../img/svg.png";
import E from "../img/bg.jpg";
import React from "react";
const Home = () => {
  return (<div className="h" >
    <div className="h-nav">
        <a href="https://www.instagram.com/chaniru.lk/" className="h-nav-links">Menu</a>
        <img src={A} alt="Hey !"  className="menu"/>
        <a href="https://www.instagram.com/chaniru.lk/" className="h-nav-links-two">cart</a>
        <img src={B} alt="Hey !"  className="menu-two"/>
        <h2 className="h-nav-logo"> 
        DAL1781
        </h2>
    </div>
    <div className="h-main">
    <h1 className="h-main-title">
        frantoio cavalli
    </h1>
    <img src={E} alt="" className="h-main-i" />
    </div>
  </div>
  );
};
export default Home;