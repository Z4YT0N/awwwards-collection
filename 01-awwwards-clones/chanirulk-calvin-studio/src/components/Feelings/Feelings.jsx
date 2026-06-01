import "./feelings.css";
import F from "../img/7.jpg"
import G from "../img/8.jpg"

import React from "react";

const Feelings = () => {
  return ( <div className="fe">
      <div className="f-right">
      <p className="f-loc">35.8617° N, 104.1954° E</p>
             <div className="f-links">
             <a href="#" class="myButton-fe">call</a>
             <a href="#" class="myButton-ge">About</a>
             <a href="#" class="myButton-he">Work</a>
             </div>
         </div>
      <div className="f-right">
          <h1 className="f-title">feelings library</h1>

             <div className="f-pro-links">
                        <p className="f-par">Project Partners: <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; GSP STUDIO, skip gallery, self space, <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; moon studio, concept design, gse 
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;skips  </p>

                        <br />
                        <br />


                        <p className="f-par-2">Our Services: <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; GSP STUDIO, skip gallery, self space, <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; moon studio, concept design, gse 
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;skips  </p>

                        <br />
                        <br />

                        <p className="f-par-3">Photographs: <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; Kate rose, gity ances, peter sare, <br />
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; Angelia betty, dolly nice</p>


                        <br />
                        <br />

                        <a href="#" className="f-fashion">Calvin fashion</a>
                       
            </div>

            <div className="f-textbox">
                        <p className="f-prag">
                            The lockdown propelled mental health to the <br />
                            forefront of our minds, and we wanted to find a way to  <br />
                            address it in true <span className="f-cap">CALVIN</span>
                            &nbsp; fashion. We brought the idea to <br />
                            life with the help of two amazing collaborators.
                        </p>
            </div>

             
      </div>
     
      <div className="f-left">
           <img src={F} alt="Hey ! I am a image"  className="f-for"/>
           <img src={G} alt="Hey ! I am a image"  className="f-fore"/>
      </div>
     <div className="f-l-section">
         <h1 className="f-l-title-ex">EXPLORATION</h1>

         <p className="f-l-para">
            FEEL LIBRARY is a three week
            immersive pop up, designed to   <br />
            help us check in with our big, sometimes 
            messy feelings and   <br />
            concert with others within the creative space of a skip.
         </p>

         
     </div>

     <a href="#" className="f-ad">Flexiable access to private</a>

  </div>
  );
};

export default Feelings;
