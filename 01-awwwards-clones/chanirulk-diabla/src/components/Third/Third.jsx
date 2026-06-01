import "./third.css";
import E from "../img/13.jpg";
import F from "../img/12.jpg";
import G from "../img/11.jpg";
import H from "../img/14.jpg";
import React from "react";

const Third = () => {
  return <div className="thrd">
            
            <div class="row-third">
                <div class="column-third">
               <img src={E} alt="" className="pink-wall" />
                <p className="aces">Accesorios</p>
                <p className="des-one">
                objetos diabla para distints usos <br />
                que complementan nuestras <br />
                colecciones
                </p>
                <a href="#" class="todos">todos los accesorios</a>
            </div>
            <div class="column-third">
               <img src={F} alt="" className="rest" />
               <p className="aces">patoso</p>
               <p className="des-one">
               el puf convertido en butaca diseno <br />
               de alejandara gandia-blasco
                </p>
                <a href="#" class="todos-two">patoso</a>

            </div>
            <div class="column-fourth">
                <img src={G} alt="" className="ranibow" />
                <p className="top-one">
                Un chapuzon con <br />
                diabla: las boas ibiz
                </p>
                <p className="sub-text-one">
                14 julio 2021
                </p>
                <p className="brief">  
                    Desde la iconicas <br />
                    fotografias de Slim Aarons <br />
                    hasta los espectaculos <br />
                    acuaticos de las pelicuals <br />
                    de Esther Williams, la <br />
                    sirena de Hollywood, <br />
                    pasando por las...
                </p>
                <a href="#" class="info">mas informacion</a>

            </div>
            <div class="column-fourth">
            <img src={H} alt="" className="ranibow" />
                <p className="top-one">
                Un chapuzon con <br />
                diabla: las boas ibiz
                </p>
                <p className="sub-text-one">
                14 julio 2021
                </p>
                <p className="brief">  
                    Desde la iconicas <br />
                    fotografias de Slim Aarons <br />
                    hasta los espectaculos <br />
                    acuaticos de las pelicuals <br />
                    de Esther Williams, la <br />
                    sirena de Hollywood, <br />
                    pasando por las...
                </p>
                <a href="#" class="info">mas informacion</a>
            </div>
            
        </div>
  </div>;
};

export default Third;
