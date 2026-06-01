import "./five.css";
import AL from "../Img/Alm.png";
import BON from "../Img/bonchi.png";
import CHO from "../Img/cho.png";
import EG from "../Img/egg.png";

import React from "react";

const Five = () => {
  return <div className="five">
        <div className="cate">
            <p className="cate-text">Categories</p>
            <div className="list-cate">
            <li><a href="" className="cate-link">Snacks</a></li>
            <li><a href="" className="cate-link">Herbs & Spices</a></li>
            <li><a href="" className="cate-link">Nuts & Seeds</a></li>
            <li><a href="" className="cate-link">Superfoods</a></li>
            <li><a href="" className="cate-link">Legumes</a></li>
            <li><a href="" className="cate-link">Candy & Chocolate</a></li>
            <li><a href="" className="cate-link">Oil, Vinegars & Honey</a></li>
            <li><a href="" className="cate-link">Grains</a></li>
            <a href="#" className="more">More +</a>
            </div>
            <div className="list-image">
                <img src={AL} alt="" className="list" />
                <img src={BON} alt="" className="list-two" />
                <img src={CHO} alt="" className="list-three" />
                <img src={EG} alt="" className="list-four" />
            </div>
        </div>
  </div>;
};

export default Five;
