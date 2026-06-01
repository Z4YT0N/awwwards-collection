import "./fourth.css";
import I from "../img/logo.png";
import J from "../img/valencia.png";
import K from "../img/cat.png";

import React from "react";

const Fourth = () => {
  return <div className="f">
      <h1 className="head-f">
      impulsores de valencia capital mundial del diseno 2022
      </h1>
      <div className="images">
          <img src={I} alt="" />
          <img src={J} alt="" />
          <img src={K} alt="" />
      </div>
  </div>;
};

export default Fourth;
