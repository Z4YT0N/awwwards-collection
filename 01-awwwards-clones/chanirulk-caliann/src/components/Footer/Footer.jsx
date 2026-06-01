import "./footer.css";
import K from "../img/ig.png";
import React from "react";
const Footer = () => {
  return (<div className="f">
      <h1 className="f-logo">
       FRANTOIO CAVALLI
      </h1>
        <p className="footer-last">
            ©2022 FRANTOIO CAVALLI +39 3459291241 VIA CASA DEL MEDICO N° 10, 03027 RIPI (FR) – ITALIA P. IVA 02794600607
        </p>
        <a href="https://www.instagram.com/chaniru.lk/" className="footer-last-credit">
           Built by - @chaniru.lk
        </a>
      <div className="row">
                <div className="column">
                    <a href="https://www.instagram.com/chaniru.lk/" className="tag">HOME</a>
                    <br />
                    <br />
                    <a href="https://www.instagram.com/chaniru.lk/" className="tag">Oil</a>
                    <br />
                    <br />
                    <a href="https://www.instagram.com/chaniru.lk/" className="tag">salse</a>
                </div>
                <div className="column">
                <a href="" className="tag">la nostra stroria</a>
                        <br />
                        <br />
                        <a href="https://www.instagram.com/chaniru.lk/" className="tag">il ciclo produttivo</a>
                        <br />
                        <br />
                        <a href="https://www.instagram.com/chaniru.lk/" className="tag">contatti</a>
                </div>
                <div className="column">
                        <a href="https://www.instagram.com/chaniru.lk/" className="tag-two">termini e condizioni</a>
                        <br />
                        <br />
                        <a href="https://www.instagram.com/chaniru.lk/" className="tag-two">spedizioni</a>
                </div>
                <div className="column">
                <a href="https://www.instagram.com/chaniru.lk/" className="tag-three">
                    <img src={K} alt="" className="ig" />
                </a>
                </div>
      </div>
  </div>
  );
};

export default Footer;
