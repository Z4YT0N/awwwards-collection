import "./nine.css";
import LEAF from "../img/11.jpg";

import React from "react";

const Nine = () => {
  return <div className="nine">
    <p className="credit-line">vibor has a quality system certified iso 9001 2015 and all products are designed in accordance with
european technincal regulations to ensure the highest quality standards.</p>
    <img src={LEAF} alt="" className="leaf" />
    <div className="leaf-head">2022 <br />
    General <br />
    catalogue
    </div>
    <a href="https://www.instagram.com/chaniru.lk/" class="myButton">Download</a>
    <p className="need">Need more help?</p><a href="" className="contact">CONTACT US</a>
  </div>;
};

export default Nine;
