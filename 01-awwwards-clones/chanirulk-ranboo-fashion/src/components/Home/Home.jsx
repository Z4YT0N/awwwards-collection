import "./home.css";
import GREEN from "../img/hover.png";
import MERCH from "../img/merch.mp4";
import React from "react";

const Home = () => {
  return <div className="home">
    <div class="brand">
        <p className="logo">Ranboo Fashion</p>
    </div>
    <div className="menu">
        <a href="" className="menu-links">Shop all</a>
        <a href="" className="menu-links">about</a>
        <a href="" className="menu-links">all</a>
    </div>
    <hr className="line" />
    <div className="hover-el">
        <img src={GREEN} alt="" className="green" />
    </div>
    <div className="hover-el-two">
        <img src={GREEN} alt="" className="green" />
    </div>
    <div className="title">ranboo</div>
    <hr className="line-two" />
    <div className="vid-block">
    <video src={MERCH} className="move" autoPlay muted loop></video>
    </div>
    <div className="vid-block-two">
    <video src={MERCH} className="move" autoPlay muted loop></video>
    </div>
    <p className="des-about">
    The defining new collection from everyone's favourite half- <br />
    masked creator is out now for a limited release. Presenting, <br />
    the Ranboo 2k21. This collection is already taking the fashion <br />
    scence by storm; now the traditional world is seeking this <br />
    'Ranboo' to find out what it is exactly he thinks he's doing.
    </p>
  </div>;
};

export default Home;
