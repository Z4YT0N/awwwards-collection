import "./home.css";
import DROP from "../img/drop.png";
import STAR from "../img/drew.png";
import React from "react";

const Home = () => {
  return <div className="home">
    <div className="logo">@chaniru.lk</div>
    <div className="navbar">
        <a href="https://www.instagram.com/chaniru.lk/">About us</a>
        <a href="https://www.instagram.com/chaniru.lk/">sauna benefits</a>
        <a href="https://www.instagram.com/chaniru.lk/">services & memberships</a>
        <a href="https://www.instagram.com/chaniru.lk/">instagram</a>
    </div>
    <div class="row">
        <div class="column">
            <h1 className="head">Ready, <br />
            sweat, <br />
            glow
            </h1>
            <img src={STAR} alt="" className="start" />
        </div>
        <div class="column-drop">
            <button><a href="https://www.instagram.com/chaniru.lk/">book now</a></button>
            <img src={DROP} alt="" className="drop-pic" />
        </div>
    </div>
  </div>;
};

export default Home;
