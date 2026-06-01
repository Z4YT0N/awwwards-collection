import "./second.css";
import B from "../img/5.jpg";
import C from "../img/10.jpg";
import D from "../img/6.jpg";
import React from "react";

const Second = () => {
  return <div className="s">
        
        <div class="row">
            <div class="column">
                <img src={B} alt="" className="carry" />
                <p className="sub-one">costuras</p>
                <p className="para-one">
                    Strikeout! los pufs base y ball de <br />
                    teresa sapey & partners inspirados <br />
                    en el mundo del beisbol.
                </p>
                <a href="#" class="myButton">costuras</a>
            </div>
            <div class="column">
                <p className="seasons">Four <br />
                seasons <br />
                with us 
                </p>
                <img src={C} alt="" className="book" />
                <img src={D} alt="" className="open-book" />
                <p className="sub-two">Aniex Diabla 2022 <br />
                <span className="light-date">27 ENERO, 2022</span></p>
                <p className="para-two">
                    El viaje iniciado en el catalogo 2022 de Diabla se gesto <br />
                    en un momento marcado por la imposibilidad de salir de <br />
                    casa, dando rienda suelta a la imaginacion... <br />
                </p>
                <a href="#" class="inform">mas informacion</a>
            </div>
            <div class="column-three">
                <div className="slider">
                    <ul class="slideshow-two">
                        <li><span></span> </li>
                        <li> <span></span> </li>
                        <li> <span></span> </li>
                    </ul>
                </div>
                <p className="para-three">
                    José A. Gandía Blasco Canales <br />
                    Diseñador y presidente y director creativo de <br />
                    Gandia Blasco Group. En los años 90 recondujo la <br />
                    actividad de la empresa familiar para transformarla <br />
                    en un referente del diseño internacional. Diabla es la <br />
                    tercera marca que pone en marcha, siendo su <br />
                    proyecto empresarial más reciente.
                    <br />
                    <br />
                    “La belleza tiene que ser funcional en cualquier <br />
                     mueble. Me atrae pensar en las piezas que llevan <br />
                     mucho tiempo en el imaginario colectivo, por eso <br />
                     conectan fácilmente con la gente. El hecho de <br />
                     haberlas rediseñado las acerca más al usuario actual”.
                </p>
                <div className="buttons">
                <a href="#" class="stick">lipstick</a>
                <a href="#" class="stick">trip</a>
                <a href="#" class="stick">faroles</a>
                <a href="#" class="stick">clip</a>
                <a href="#" class="stick">365</a>
                </div>


            </div>
        </div>
  </div>;
};

export default Second;
