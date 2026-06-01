import './six.css';
import React from "react";
import FILLCLIDE from "../img/li2.png";
import FILLCLIDE1 from "../img/deco4.png";
import FILLCLIDE2 from "../img/deco5.png";
import FILLCLIDE3 from "../img/li4.png";
import FILLCLIDE4 from "../img/li1.jpg";
import FILLCLIDE5 from "../img/li2.png";
const Six = () => {
  return <div className='six-layed'>
    <hr className="six-line" />
    <hr className="six-line-two" />
    <h1 className="explore">Explore our featured products</h1>
    <hr className="six-line-three" />
    <div className="clide-one">
        <div className="clide-pic">
            <img src={FILLCLIDE} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <div className="clide-two">
        <div className="clide-pic">
            <img src={FILLCLIDE1} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <div className="clide-three">
        <div className="clide-pic">
            <img src={FILLCLIDE2} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <div className="clide-four">
        <div className="clide-pic">
            <img src={FILLCLIDE3} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <div className="clide-five">
        <div className="clide-pic">
            <img src={FILLCLIDE4} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <div className="clide-six">
        <div className="clide-pic">
            <img src={FILLCLIDE5} alt="" className="clide-fill" />
        </div>
        <p className="clide-name">Atajux lamp</p>
        <p className="clide-price">$2,333</p>
    </div>
    <hr className="six-line-last" />
    <a href="https://www.instagram.com/chaniru.lk/" className="shop-clide">Shop all</a>
    <hr className="six-line-last-two" />
  </div>;
};

export default Six;
