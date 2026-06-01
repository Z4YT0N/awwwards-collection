import "./fourth.css"
import IMG1 from "../img/1.jpg";
import IMG2 from "../img/2.jpg";
import IMG3 from "../img/3.jpg";
import IMG4 from "../img/4.jpg"; 
import React from "react";

const Fourth = () => {
  return <div className="fourth"> 
    <div className="gallery">
        <div className="box-1">
            <div className="name">Pressure switches</div>
            <img src={IMG1} alt="" className="gallery-picture" />
        </div>
        <div className="box-2">
            <div className="name-two">temperature switches</div>
        <img src={IMG2} alt="" className="gallery-picture" />
        </div>
        <div className="box-3">
            <div className="name">vacuum switches</div>
            <img src={IMG3} alt="" className="gallery-picture" />
        </div>
        <div className="box-4">
            <div className="name-two">level switches</div>
        <img src={IMG4} alt="" className="gallery-picture" />
        </div>
    </div>
  </div>;
};

export default Fourth;
