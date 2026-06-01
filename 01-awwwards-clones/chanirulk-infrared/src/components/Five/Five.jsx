import "./five.css";
import SA1 from "../img/HM2.png";
import SA3 from "../img/210.png";
import SUN from "../img/sun.png";
import STARO from "../img/starred.png";
import React from "react";

const Five = () => {
  return <div className="five">
    <div className="col-one">
        <img src={SA3} alt="" className="tour-one" />
        <button className="sauna">Book a sauna session</button>
    </div>
    <div className="col-two">
        <img src={SA1} alt="" className="tour" />
    </div>
    <div className="people">People are saying</div>
    <div className="table-box">
    <a href="https://www.instagram.com/chaniru.lk/" className="line-c">@chanir.lk - Instagram</a>
    <div className="static">
        <img src={SUN} alt="" className="sun" />
        <img src={STARO} alt="" className="start-bo" />
    </div>
    </div>
    <div className="table-box-two">
        <div className="kastiya">Tifani C.</div>
        <img src={STARO} alt="" className="start-up" />
        <img src={STARO} alt="" className="start-up" />
        <img src={STARO} alt="" className="start-up" />
        <img src={STARO} alt="" className="start-up" />
        <img src={STARO} alt="" className="start-up" />
        <p className="date">12.june.2022</p>
        <p className="saying">
        wow! for year i have dealth with inflammation and <br />
        back pain, and infrared light therapy has already <br />
        made a big difference. coming here has become a <br />
        part of my regular routine now!
        </p>
    </div>    

  </div>;
};

export default Five;
