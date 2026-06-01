import "./second.css";
import FACE from "../img/mod2.png";
import FACE2 from "../img/mod1.png";
import SEAS from "../img/sea2.png";
import SEAS2 from "../img/sea1.png";
import React from "react";

const Second = () => {
  return <div className="second">
    <p className="tagline">Treat your skin in every season</p>
    <div className="about-head">Skincare For <br />
    Autumn
    </div>
    <p className="about-des">
        Your skin reacts different in the winter <br />
        from summer. our products treat your skin <br />
        with the proper vitamins for every season  <br />
        so it's healthy year-round.
    </p>
    <img src={SEAS} alt="" className="face-three" />
    <img src={SEAS2} alt="" className="face-four" />
    <img src={FACE} alt="" className="face-one" />
    <img src={FACE2} alt="" className="face-two" />
  </div>;
};

export default Second;
