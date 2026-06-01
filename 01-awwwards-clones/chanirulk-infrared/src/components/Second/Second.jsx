import "./second.css";
import FLWR from "../img/flower2.png";
import PURP from "../img/210.png";
import ARRW from "../img/dial.png";
import React from "react";

const Second = () => {
  return <div className="second">
    <div className="text-one">
    harness the benefit <br />
    infrared heat for a healthy <br />
    mind and body
    </div>
    <img src={FLWR} alt="" className="flower-one" />
    <div className="box-on">
        <img src={PURP} alt="" className="box-fill" />
    </div>
    <div className="small-ver">Our medical grade</div>
    <div className="next-text">
        Infrared <br />
        saunas are not your <br />
        traditional high heat, <br />
        high moisture sauna <br />
        experience.
    </div>
    <div className="svg">
        <img src={ARRW} alt="" className="svg-arrw" />
    </div>
  </div>;
};

export default Second;
