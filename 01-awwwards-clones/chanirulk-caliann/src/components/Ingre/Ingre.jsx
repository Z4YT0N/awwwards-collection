import "./ingre.css";
import O from "../img/c1.png";
import F from "../img/c3.jpg";
import G from "../img/c4.jpg";
import H from "../img/c5.jpg";
import J from "../img/c6.jpg";

import React from "react";

const Ingre = () => {
  return (<div className="i">
      <div className="i-main">
            <h1 className="i-main-title">
                    le r <img src={O} alt="" className="i-main-title-fork" /> icette <br />
                    del frantoio
            </h1>
            <div className="scroll-i">
                    <img src={F} alt="" className="i-pic-one" /> 
                    <img src={G} alt="" className="i-pic-one" />
                    <img src={H} alt="" className="i-pic-one" />
                    <img src={J} alt="" className="i-pic-one" />
                    <img src={G} alt="" className="i-pic-one" />
                    <img src={H} alt="" className="i-pic-one" />
                    <img src={J} alt="" className="i-pic-one" />
            </div>
            <p className="hover-pc">Scroll Me &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Scroll Me</p>
      </div>
      

      </div>
  );
};

export default Ingre;
