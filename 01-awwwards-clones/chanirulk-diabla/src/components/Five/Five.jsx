import "./five.css";
import END from "../img/logo.png";
import CAT from "../img/cat.png";
import React from "react";

const Five = () => {
  return <div className="five">
        <div class="row-five">
            <div class="column-menu">
                <p className="link-menu">Partners</p>
                <p className="link-root">
                    Gandia balsco <br />
                    gan
                </p>
            </div>

            <div class="column-menu">
            <p className="link-menu">social</p>
                <div className="social-links">
                <a href="https://www.instagram.com/chaniru.lk/" className="link-root-social">Instagram</a> <br />
                <a href="https://www.instagram.com/chaniru.lk/" className="link-root-social">Facebook</a> <br />
                <a href="https://www.instagram.com/chaniru.lk/" className="link-root-social">pinterest</a>
                </div>
            </div>

            <div class="column-menu">
                 <p className="link-menu">Newsletter</p>
                <p className="news-title">
                    forma parte de nuestra famila
                </p>
                <div class = "signup-box">  
                        <form class = "signup-form">    
                        <input type = "email" name = "email" class = "signup-input" placeholder="escribe tu email" required >  
                        </input>
                        </form>
                </div>
                <div class = "signup-terms">  
                <input id="cb3" type="checkbox" />
                    <label for = "terms">he leido y acepto la politica de privacidad</label>  
                </div>  
                    <input type = "submit" value = "Subscribe"  className="submit"/>  
            </div>

            <div class="column-menu-two">
            <p className="link-menu">menu</p>
                <div className="menu-row">
                    <div className="menu-item">
                        <a href="" className="item">productos</a> <br />
                        <a href="" className="item">nosotros</a> <br />
                        <a href="" className="item">disenadores</a>
                    </div>
                    <div className="menu-item">
                        <a href="" className="item">attitude</a> <br />
                        <a href="" className="item">contacto</a> <br />
                        <a href="" className="item">descargas</a>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="footer">
        <img src={END} alt="" className="end-logo" />
        <img src={CAT} alt="" className="end-logo-cat" />
            <a href="https://www.instagram.com/chaniru.lk/" className="footer-credits">Code by - @chaniru.lk</a>
            <p className="address">            
                gandia blasco s.a c/ musico vert 4.46870 ontinyeny valencia, spain cif: <br />
                esa4063513242 t. +34 96 785 14 50
            </p>
            <div className="end-credit">
                2022 chaniru.lk <br />
                code / design
            </div>
        </div>
  </div>;
};

export default Five;
