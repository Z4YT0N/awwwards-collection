import "./third.css";
import OVAL from "../Img/9.png";
import React from "react";

const Third = () => {
  return <div className="third">
        <div class="marquee">
	        <div class="marquee__inner" aria-hidden="true">
		        <span>refill</span>
		        <span>rethink</span>
		        <span>reuse</span>
		        <span>@chaniru.lk</span>
	        </div>
        </div>
        
    <div class="row">
        <div class="column">
            <h1 className="next">Next-Day Delivery</h1>
            <p className="next-ext">Now available! Place your order bt 5pm for <br />
            plastic-free groceries delivered to your door <br />
            the following day.
            </p>
            <a href="#" className="order">Order Now</a>

        </div>
        <div class="column-two">
            <img src={OVAL} alt="" className="oval" />
        </div>
    </div>
</div>;
};

export default Third;
