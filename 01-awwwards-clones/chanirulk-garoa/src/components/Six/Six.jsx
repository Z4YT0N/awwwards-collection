import "./six.css";
import HOV from "../img/hover1.png";
import HOV2 from "../img/hover3.png";
import HOV3 from "../img/hover2.png";
import React from "react";

const Six = () => {
  return <div className="six">
    <div class="tag-one">Facial Moisturizer</div>
    <div class="hover">
        <img src={HOV} alt="" className="hover-pic" />
    </div>
    <div class="tag-two">Hydrating Mask</div>
    <div class="hover-two">
        <img src={HOV2} alt="" className="hover-pic" />
    </div>
    <div class="tag-three">Exfoliant Paste</div>
    <div class="hover-three">
        <img src={HOV3} alt="" className="hover-pic" />
    </div>
    <a href="https://www.instagram.com/chaniru.lk/" class="myButton-two">Shop all</a>
  </div>;
};

export default Six;
