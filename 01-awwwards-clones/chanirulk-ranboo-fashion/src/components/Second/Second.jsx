import "./second.css";
import RAN from "../img/pic1.png";
import SADE from "../img/noise.gif";
import CROWN from "../img/crown.png";
import ATHA from "../img/graf.png";
import React from "react";

const Second = () => {
  return <div className="second"> 
    <img src={RAN} alt="" className="stat" />
    <div className="in-el">
    <img src={SADE} alt="" className="sade" />
    </div>
    <div className="clip">
        <img src={CROWN} alt="" className="clip-hover" />
    </div>
    <img src={ATHA} alt="" className="clip-hover-two" />
  </div>;
};

export default Second;
