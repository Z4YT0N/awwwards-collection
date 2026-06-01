import "./seven.css";
import ROT from "../img/next.mp4";
import React from "react";

const Seven = () => {
  return <div className="seven"> 
  <div className="sensor-head">next <br />
  level <br />
  sensors
  </div>
    <video src={ROT} className="sensor-video" loop autoPlay muted></video>
  </div>;
};

export default Seven;
