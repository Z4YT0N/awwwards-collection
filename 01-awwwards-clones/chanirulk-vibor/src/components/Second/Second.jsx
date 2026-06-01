import "./second.css";
import GLOBE from "../img/globe.png";

import React from "react";

const Second = () => {
  return <div className="second">
    <div className="left">
        <img src={GLOBE} alt="" className="globe" />
        <p className="globe-text">Based in milan (italy) <br />
        and working world wide
        </p>
        <p className="globe-text-credit">
        ©2022 chaniru.lk <br />
        all rights reserved
        </p>
    </div>
    <div className="about-title">vibor <span>is a</span> manufacturer <span>of</span> <br />
    temperature, pressure <span>and</span> level <br />
    sensors <span>in</span> industrial, automotive <span>and</span> <br />
    mobile sector
    </div>
  </div>;
}

export default Second;
