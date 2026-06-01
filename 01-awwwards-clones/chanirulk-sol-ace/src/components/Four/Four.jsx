import "./four.css";
import CARD1 from  "../img/chair30.png";
import CARDA from  "../img/chair3.png";
import CARD2 from "../img/deco3.png";
import React from "react";

const Four = () => {
  return <div className="four">
    <div class="parallax">
        <div className="card">
            <div className="card-inter">
                <img src={CARD1} alt="" className="card-fill" />

            </div>
            <p className="des-wood">Matte wood chair</p>
            <p className="des-wood-price">$3,500</p>
        </div>
        <div className="card-two">
            <div className="card-inter">
                <img src={CARD2} alt="" className="card-fill" />
            </div>
            <p className="des-wood">Matte wood chair</p>
            <p className="des-wood-price">$3,500</p>
        </div>
        
    </div>

  </div>;
};

export default Four;
