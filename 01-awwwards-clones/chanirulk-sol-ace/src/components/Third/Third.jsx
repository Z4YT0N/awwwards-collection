import "./third.css";
import IMG1 from "../img/chair30.png";
import React from "react";

const Third = () => {
  return <div className="third">
    <div className="side-one">
        <div className="side-head">Matte Wood Chair</div>
        <p className="side-about">
        Refinement Chair with Ripped Seat, made of retro Eucalyptus wood, of <br />
        great resistance, Kiln dried, made with a spike system and painted with <br />
        P.U. (Polyurethane) With its entire structure painted in wood, it offers a <br />
        lot of elegance to your environment and when cleaning is very easy, as <br />
        it is washable and light for movement. Enough of receiving visitors and <br />
        not having a place to accommodate them. With the chair, your days as <br />
        a host will be marked by a lot of elegance and sophistication.
        </p>
        <a href="" className="link-about">view product</a>
    </div>
    <div className="side-two">
        <img src={IMG1} alt="" className="chair" />
    </div>
  </div>;
};

export default Third;
