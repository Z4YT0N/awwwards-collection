import "./four.css";
import H1 from "../img/high1.png";
import H2 from "../img/high2.png";
import H3 from "../img/high3.png";
import React from "react";

const Four = () => {
  return <div className="four">
    <p className="text-drop">
        Your skin <img src={H1} alt="" className="high" /> reacts differently according to every season, <br />
        in the months of September, October, and November <img src={H2} alt="" className="high" /> <br />
        your skin tends to start drying a bit easier. so we offer a <br />
        selection of essential skincare <img src={H3} alt="" className="high" /> products for your <br />
        morning and night routines to keep your skin perfect.
    </p>
  </div>;
};

export default Four;
