import "./grid.css";
import PIC1 from "../img/chair50.png";
import PIC2 from "../img/chair20.png";
import PIC3 from "../img/chair30.png";
import PIC4 from "../img/chair40.png";
import React from "react";

const Grid = () => {
  return <div className="grid">
    <div className="line" /> 
    <div className="feature">Enjoy our featured products</div>
    <div className="line-two" /> 
    <div className="products">
      <div className="prod-grid">
        <div className="prod-grid-pic">
          <img src={PIC1} alt="" className="contain" />
          <p className="price-des">Native iron chair</p>
          <p className="price">$4,990</p>
        </div>
      </div>
      <div className="prod-grid-two">
        <div className="prod-grid-pic">
          <img src={PIC2} alt="" className="contain" />
          <p className="price-des">onyx wood chair</p>
          <p className="price">$4,990</p>
        </div>
      </div>
      <div className="prod-grid-three">
        <div className="prod-grid-pic">
          <img src={PIC3} alt="" className="contain" />
          <p className="price-des">Native light chair</p>
          <p className="price">$4,990</p>
        </div>
      </div>
      <div className="prod-grid-four">
        <div className="prod-grid-pic">
          <img src={PIC4} alt="" className="contain" />
          <p className="price-des">Native iron chair</p>
          <p className="price">$4,990</p>
        </div>
      </div>
    </div>
    <a href="" className="shop-link">SHOP ALL</a>
    <div className="line-three"></div>
  </div>;
};

export default Grid;
