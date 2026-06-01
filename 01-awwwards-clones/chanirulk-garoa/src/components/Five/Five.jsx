import "./five.css";
import SLIDE from "../img/cat1.png";
import SLIDE2 from "../img/cat2.png";
import SLIDE3 from "../img/cat3.png";
import SLIDE4 from "../img/cat4.png";
import React from "react";

const Five = () => {
  return <div className="five">
    <p className="season">This Season</p>
    <div className="slide-head">Daily <br />
    Skincare
    </div>
    <div className="items">
        <div className="entry">
            <img src={SLIDE} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE2} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE3} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE4} alt="" className="slide" />
        </div>
    </div>
  </div>;
};

export default Five;
