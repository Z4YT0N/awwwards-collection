import "./third.css";
import HADIYAWA from "../img/43.png";
import BOY from "../img/ho.png";
import React from "react";

const Third = () => {
  return <div className="third">
    <div className="box-third">
        <img src={BOY} alt="" className="fill-one" />
    </div>
    <div className="box-two">
        <img src={HADIYAWA} alt="" className="fill-two" />
    </div>
    <a href="https://www.instagram.com/chaniru.lk/" className="link-about">more about us</a>
    <p className="long-text">
    longer sessions with a lower temperature and zero humidity <br />
    helps your body to heat up gently while maximizing the <br />
    benefits of an intense sweat session.
    </p>
    
  </div>;
};

export default Third;
