import "./about.css";
import A from "../img/bh.jpg";
import C from "../img/c8.png";
import F from "../img/c9.png";
import T from "../img/c7.png";
import React from "react";
const About = () => {
  return (<div className="a">
        <div className="a-main">
        <p className="h-about">
              Dal 1781 <img src={F} alt="" className="h-img" /> amore e dedizione per la <br />
              coltivazione e la produzione <br />
              delle pilù pregiate <img src={C} alt="" className="h-img-two" /> varietá de olive


              <a href="https://www.instagram.com/chaniru.lk/" class="myButton">la nostra storia</a>


              <h1 className="h-head">un olio <br />
                  antico
             </h1>

             <img src={T} alt="" className="a-main-it" />

             <a href="https://www.instagram.com/chaniru.lk/" class="myButton-oil">acquista ora</a>

        </p>
            <img src={A} alt="" className="a-main-i" />
        </div>
  </div>
  );
};

export default About;
