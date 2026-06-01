import "./five.css";
import HOLDER from "../img/scene4.jpg";
import React from "react";

const Third = () => {
  return <div className="five">
    <div className="layer-one">
        <div className="layer-head">Loobook</div>
        <p className="layer-about-des">
        The pieces stand out for their contemporary straight lines and imposing <br />
        presence. Current, following the world trend of the great masters, the <br />
        furnitutre stands out for its noble and innovative materials, composing <br />
        sophisticated and exclusive environments.
        </p>
        <hr className="layer-line" />
        <hr className="layer-line-two" />
    </div>
    <div className="layer-two"> 
      <hr className="content-one" />
      <hr className="content-two" />
      <hr className="content-three" /> 
    <hr className="layer-line-three" />
    <p className="item">Item</p>
    <hr className="layer-line-four" />
    <hr className="layer-line-five" />
    <p className="des-pase">Description</p>
    <div className="pase-card">
        <div className="placer">
          <div className="placer-box">
            <img src={HOLDER} alt="" className="holder" />
          </div>
        </div>
        <a href="https://www.instagram.com/chaniru.lk/" className="value-left">See Loobook</a>
        <a href="https://www.instagram.com/chaniru.lk/" className="credit-tag-two">@chanir.lk</a>
    </div>
    <p className="class-one">materials:</p>
    <p className="class-two">produced in:</p>
    <p className="class-three">Creamic, glass, iron, wood</p>
    <p className="class-four">Creamic, glass, iron, wood</p>
    </div>
  </div>;
};

export default Third;