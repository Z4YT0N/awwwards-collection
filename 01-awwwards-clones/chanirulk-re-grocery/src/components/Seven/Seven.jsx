import "./seven.css";
import IG from "../Img/ig.jpg";
import React from "react";

const Seven = () => {
  return <div className="seven">
    <div className="socail-text">
        <p className="social">Follow us on Instagram</p>
        <a href="#" className="social-btn">@chaniru.lk</a>
    </div>
    <div class="row-last">
        <div class="column-last" >
            <img src={IG} alt="" className="insta" />
        </div>

        <div class="column-last" >
            <img src={IG} alt="" className="insta" />
        </div>

        <div class="column-last" >
            <img src={IG} alt="" className="insta" />
        </div>

        <div class="column-last" >
            <img src={IG} alt="" className="insta" />
        </div>

    </div>

    <div className="slide-back">
    <div class="row-footer">
        <div class="column-footer" >
        <div className="head-footer">re</div> 
        </div>

        <div class="column-footer" >
           <p className="footer-text"><span  className="re">re_</span> makes it easier and more affordable to <br />
           shop sustainably. To do better than recycling. <br />
           To say no to plastic altogether. Thanks to you, <br />
           we've diverted over 250,000 items of <br />
           packaging from landfill since opening on  <br />
           Eath Day 2020. - <span  className="re">@chaniru.lk</span>
           </p>
        </div>
        <a href="https://www.instagram.com/chaniru.lk/" className="credit">Crafted by -@chaniru.lk</a>
    </div>
    </div>

  </div>;
};

export default Seven;

