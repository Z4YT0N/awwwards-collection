import "./projects.css";
import P1 from "../img/2.jpg";
import P2 from "../img/3.jpg";
import P3 from "../img/4.jpg";
import P4 from "../img/6.jpg";

import React from "react";

const Projects = () => {
  return ( <div className="p">
      <div className="p-center">
          <p className="p-loc">35.8617° N, 104.1954° E</p>
         <div className="p-right">
             <div className="p-links">
             <a href="#" class="myButton">call</a>
             <a href="#" class="myButton-c">About</a>
             <a href="#" class="myButton-w">Work</a>
             </div>
         </div>
         <div className="p-pro">
             <img src={P1} alt="Hey ! I am a image" />
             <img src={P2} alt="Hey ! I am a image" />
             <img src={P3} alt="Hey ! I am a image" />
             <img src={P4} alt="Hey ! I am a image" />
         </div>
            <div className="p-text">
                <p className="p-text1" >Wanas School  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; -  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;Berlin <br />
                wanadie &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
                &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; Guasta</p>

                <p className="p-text2" >Wanas School  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; -  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;Berlin <br />
                wanadie &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
                &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; Guasta</p>


                <p className="p-text3" >Wanas School  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; -  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;Berlin <br />
                wanadie &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
                &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; Guasta</p>


                <p className="p-text4" >Wanas School  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; -  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;Berlin <br />
                wanadie &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
                &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; Guasta</p>

            </div>

            <div className="p-ex">
                     <a href="#" class="myButton-ex">EXPLORE</a>
            </div>

            <div className="p-para">
                <h2 className="p-para-ex">
                    architecture practice calvin studio has created a pop - up
                    library with a thatched roof and a 'topical' intended to give
                    people a private place to journal - a digial era. <br />
                    to move with the wave.
                </h2>
            </div>
        </div>
  </div>
  );
};

export default Projects;
