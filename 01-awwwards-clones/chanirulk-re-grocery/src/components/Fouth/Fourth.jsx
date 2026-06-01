import "./fourth.css";
import ETHOS from "../Img/10.png";

import React from "react";

const Fourth = () => {
  return <div className="fourth">
 <div class="row">
        <div class="column-two-etho">
            <img src={ETHOS} alt="" className="etho" />
        </div>
        <div class="column">
            <h1 className="next">Our Ethos</h1>
            <p className="next-ext">We're here because the grocery industry has <br />
            made it impossible to avoid plastic packaging <br />
            and waste, and we want to change that.
            </p>
            <a href="#" className="order">Read more</a>
        </div>
    </div>
  </div>;
};

export default Fourth;
