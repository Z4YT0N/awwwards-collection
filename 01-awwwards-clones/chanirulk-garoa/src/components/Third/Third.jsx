import "./third.css";
import DROP from "../img/video.mp4";

import React from "react";

const Third = () => {
  return <div className="third">
    <video src={DROP} autoPlay loop muted className="drop"></video>
  </div>;
};

export default Third;

