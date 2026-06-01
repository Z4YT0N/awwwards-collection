import "./eight.css";
import BOX1 from "../img/9.jpg";
import BOX2 from "../img/10.jpg";
import React from "react";

const Eight = () => {
  return <div className="eight">
    <div className="news">Featured <br />
    news</div>
    <a href="" className="view">View all</a>
    <div className="one"></div>
    <div className="new-box">
        <img src={BOX1} alt="" className="box-fill" />
    </div>
    <div className="box-head">Vibor re branding @chaniru.lk</div>
    <p className="box-sub">
    the range of vibor's level sensors make possible to read and <br />
    control the level systems fluids at any time. by means of an <br />
    electrical signal. there are various types of level sensors such as <br />
    visual, electromagnetic with fixed or adjustable legths and with <br />
    temperature sensors.
    </p>
    <p className="date">13.june.2022</p>
    <div className="two"></div>
    <div className="box-head-two">Vibor re branding @chaniru.lk</div>
    <p className="box-sub-two">
    the range of vibor's level sensors make possible to read and <br />
    control the level systems fluids at any time. by means of an <br />
    electrical signal. there are various types of level sensors such as <br />
    visual, electromagnetic with fixed or adjustable legths and with <br />
    temperature sensors.
    </p>
    <p className="date-two">13.june.2022</p>
    <div className="new-box-two">
        <img src={BOX2} alt="" className="box-fill-two" />
    </div>
  </div>;
};

export default Eight;
