import "./six.css";
import P1 from "../img/6.png";
import P2 from "../img/7.png";
import P3 from "../img/8.png";
import React from "react";

const Six = () => {
  return <div className="six">
    <div className="why">Why choose <br />
    vibor
    </div>
    <div className="phase-one">
        <img src={P1} alt="" className="phase-img-one" />
        <div className="phase-text">technical <br />
        support
        </div>
        <p className="phase-des">
          we follow the customer in <br />
          choosing the right product <br />
          for his needs, also offering <br />
          a technical after sales <br />
          service.
        </p>
        <img src={P2} alt="" className="phase-img-two" />
        <div className="phase-text-two">products <br />
        quality
        </div>
        <p className="phase-des-two">
          innovative ideas and paying <br />
          particular attention to the <br />
          environmental impacts of <br />
          industiral production are <br />
          the vibor's mission.
        </p>
        <img src={P3} alt="" className="phase-img-three" />
        <div className="phase-text-three">customization</div>
        <p className="phase-des-three">
         we follow the customer <br />
         during the project <br />
         configuration in order to <br />
         identify the best <br />
         performance settings
        </p>
    </div>
  </div>;
};

export default Six;
