import "./video.css";
import H from "../img/bh.jpg";
import V from "../img/bh.jpg";
import SA from "../img/c13.png";
import I from "../img/vid.mp4";
import W from "../img/c10.png";
import E from "../img/c11.png";
import R from "../img/c12.png";
import T from "../img/c14.png";
import Y from "../img/c15.png";
import U from "../img/c16.png";
import React from "react";
const Video = () => {
  return (
  <div className="v">
      <div className="v-main">
      <p className="v-about">
        i sapori delle creme
        </p>
        <p className="v-des">
        con il nostro olio evo  <br />
        produciamo salse <img src={SA} alt="" className="v-sal"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e creme di <br />
        verdure biologiche
        </p>
        <h1 className="v-title">
                 le nostre <br />
                salse
        </h1>
        <div className="scroll">
           <img src={U} alt="" className="s-pic-one" /> 
           <img src={W} alt="" className="s-pic-one" />
           <img src={E} alt="" className="s-pic-one" />
           <img src={R} alt="" className="s-pic-one" />
           <img src={T} alt="" className="s-pic-one" />
           <img src={Y} alt="" className="s-pic-one" />
           <img src={U} alt="" className="s-pic-one" /> 
           <img src={W} alt="" className="s-pic-one" />
           <img src={T} alt="" className="s-pic-one" />
           <img src={Y} alt="" className="s-pic-one" />
           <img src={U} alt="" className="s-pic-one" /> 
           <img src={W} alt="" className="s-pic-one" />
        </div>
        <p className="hover-p">Scroll Me &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Scroll Me</p>
        <a href="https://www.instagram.com/chaniru.lk/" class="myButton-a">acquista ora</a>
        <h1 className="v-head">LA STORIA DI <br />
          UNA FAMIGLIA
        </h1>
        <p className="v-abt">
        Siamo uno dei più antichi<br /> 
        frantoi al mondo, produttori <br /> 
        di olio extra vergine di oliva da undici  <br />
        generazioni, un’arte tramandata di padre<br /> 
        in figlio dal XVIII
        secolo quando a Ripi, Francesco Cavalli ha iniziato a scrivere <br />
        la storia della nostra famiglia. <br />
        <br />
        Francesco, originario di Modena, <br /> 
        viene inviato nel nostro <br /> 
        territorio come funzionario dello<br /> 
        Stato Pontificio. Con la dote <br /> 
        ricevuta acquista 60 ettari di terreno,  <br />
        si sposa e mette su famiglia.<br /> 
        Si guadagna la stima e il rispetto di tutti<br /> 
        integrandosi con gran dignità nel contesto sociale del paese.
        </p>
        <a href="https://www.instagram.com/chaniru.lk/" class="myButton-c">contatti</a>
        <img src={V} alt="" className="v-title-img" />
          <img src={H} alt="" className="v-main-i" />
          <video loop muted autoPlay className="v-play">
        <source
          src= {I}
          type="video/mp4"
          className="v-main-v"
        />
      </video>
      </div>
  </div>
  );
};

export default Video;
