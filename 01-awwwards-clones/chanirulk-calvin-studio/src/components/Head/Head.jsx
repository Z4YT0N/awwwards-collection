import "./head.css";
import I from "../img/1.jpg";

import React from "react";

const Head = () => {
  return ( <div className="h" >
      <div className="h-center">
          <p className="h-loc">35.8617° N, 104.1954° E</p>
         <div className="h-right">
             <div className="h-links">
                 <a href="">Call</a>
                 <a href="">About</a>
                 <a href="">Work</a>
             </div>
         </div>
         <p className="h-sub">
          Many of life’s &nbsp; &nbsp; failures &nbsp; &nbsp; are&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; people &nbsp; &nbsp;&nbsp; &nbsp; who did  &nbsp; &nbsp;not realize how close they were to success when &nbsp; &nbsp;
          they &nbsp; &nbsp;&nbsp;  gave up &nbsp; &nbsp; Every business&nbsp; &nbsp;&nbsp; &nbsp; to  &nbsp; &nbsp; &nbsp; &nbsp;   has that point. &nbsp; &nbsp;Art is one way to &nbsp; &nbsp; motivate &nbsp; &nbsp;&nbsp; &nbsp; yourself and  &nbsp; &nbsp; 
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;with your 
          &nbsp; &nbsp;
          brand to meet  its  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          standards. &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Brands &nbsp; &nbsp;  don't &nbsp; &nbsp;&nbsp; &nbsp;just  &nbsp; &nbsp; create auidences &nbsp; &nbsp;&nbsp; &nbsp; but - creates 
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;emotions  through out it's
          &nbsp; &nbsp;&nbsp; &nbsp;  engagement &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          with &nbsp; &nbsp; its &nbsp; &nbsp; customers.&nbsp; &nbsp;&nbsp; &nbsp; Love and &nbsp; &nbsp;  Satisfaction &nbsp; &nbsp; 
          has been the &nbsp; &nbsp;two common &nbsp; &nbsp; &nbsp; &nbsp;
          ways to reach goals -&nbsp; &nbsp; Now that's a
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;powerful &nbsp; &nbsp;&nbsp; &nbsp;brand. &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Let's get 
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;this going...
         </p>
      </div>
      <div className="h-img">
          <img src={I} alt="Hey ! I am a image" />
      </div>
      <div className="h-title">
            <h1 className="h-main">calvin</h1>
            <h1 className="h-studio">studio</h1> 
      </div>
  </div>
  );
};

export default Head; 


