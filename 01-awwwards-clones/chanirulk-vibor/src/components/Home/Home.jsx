import "./home.css";
import HERO from "../img/hero.mp4";
import React from "react";

const Home = () => {
  return <div className="home">

    <div className="navbar">
        <div className="logo">VIBOR</div>
    <ul>
        
        <li><a href="https://www.instagram.com/chaniru.lk/">Contact</a></li>
        <li><a href="https://www.instagram.com/chaniru.lk/">Download</a></li>
        <li><a href="https://www.instagram.com/chaniru.lk/">News</a></li>
        <li><a href="https://www.instagram.com/chaniru.lk/">About us</a></li>
        <li><a href="https://www.instagram.com/chaniru.lk/">Products</a></li>
    </ul>
    </div>
    <div className="hero-section">
        <div className="hero-logo">VIBOR</div>
        <div className="video">
            <video src={HERO} className="hero" autoPlay muted loop></video>
        </div>
    </div>
  </div>;
};

export default Home;
