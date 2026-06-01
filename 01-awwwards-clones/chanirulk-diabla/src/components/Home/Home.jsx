import "./home.css";
import A from "../img/logo.png";
import React from "react";

const Home = () => {
  return <div className="h">
    <ul class="slideshow">
          <li><span></span> </li>
          <li> <span></span> </li>
          <li> <span></span> </li>
          <li> <span></span> </li>
    </ul>
      <div class="topnav">
        
        <a href="#" className="nav-one">contacto <br />
        buscar <br />
        <span className="dis-one">distribucion</span> 
        </a>

        <a href="#" className="link">productos <br />
        nosotros
        </a>

        <div className="logo">
          <img src={A} alt="logo" />
        </div>

        
      </div>

      <div className="top-nav-two">
          <a href="#" className="nav-one">usuario <br />
            descargas <br />
            <span className="dis-one">es en</span> 
          </a>

         <a href="#" className="link">disenadores <br />
            attitude
          </a>
      </div>
      
      
  </div>;
};

export default Home;
