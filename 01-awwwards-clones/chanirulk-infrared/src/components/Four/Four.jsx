import "./four.css";
import STARO2 from "../img/star2.png";
import REA from "../img/whit.png";
import UNIO from "../img/xero.png";
import UNIOA from "../img/PainRelief.png";
import UNIOB from "../img/MentalHealth.png";
import UNIOC from "../img/WeightLoss.png";
import AS1 from "../img/ImmunityBoost.png";
import AS2 from "../img/HealthySleep.png";
import AS3 from "../img/SkinHealth.png";
import AS4 from "../img/WeightLoss.png";
import React from "react";

const Four = () => {
  return <div className="four">
    <img src={STARO2} alt="" className="start-two" />
   <div className="ben-one">Health</div>
   <div className="ben-two">Benefits</div>
   <img src={REA} alt="" className="svg-two" />
   <div className="list-type">
   <div class="row-two">
        <div class="column-three">
            <p className="list-thing"><img src={UNIO} alt="" className="clap" />&nbsp; Heart Health</p>
            <p className="list-thing"><img src={UNIOA} alt="" className="clap" />&nbsp; Pain Relief</p>
            <p className="list-thing"><img src={UNIOB} alt="" className="clap" />&nbsp; Mental Health</p>
            <p className="list-thing"><img src={UNIOC} alt="" className="clap" />&nbsp; Weight Loss</p>
        </div>
        <div class="column-two">
        <p className="list-thing"><img src={AS1} alt="" className="clap" />&nbsp; Immunity BoosT</p>
            <p className="list-thing"><img src={AS2} alt="" className="clap" />&nbsp; Healthy Sleep</p>
            <p className="list-thing"><img src={AS3} alt="" className="clap" />&nbsp; Skin Health</p>
            <a  href="" className="list-thing-tag">↪ More Benefits</a>
        </div>
    </div>
   </div>
   </div>;
};

export default Four;
