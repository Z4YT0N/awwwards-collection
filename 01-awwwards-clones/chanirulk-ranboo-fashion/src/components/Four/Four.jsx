import "./four.css";
import FILL from "../img/t.png";
import BOY from "../img/boy.png";
import HAY from "../img/sta.png";
import React from "react";

const Four = () => {
  return <div className="four">
    <div class="row-two">
        <div class="column-two">
            <img src={FILL} alt="" className="fill" />
            <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
            </div>
        </div>
        <div class="column-two">
        <img src={FILL} alt="" className="fill" />
        <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
        </div>
        </div>
        <div class="column-two">
        <img src={FILL} alt="" className="fill" />
        <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
        </div>
        </div>
    </div>
    <div class="row-three">
        <div class="column-three">
            <img src={FILL} alt="" className="fill" />
            <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
            </div>
        </div>
        <div class="column-three-cover">
            <img src={BOY} alt="" className="fill-two" />
        </div>
    </div>
    <div class="row-four">
        <div class="column-four">
            <img src={HAY} alt="" className="fill" />
        </div>
        <div class="column-four">
        <img src={FILL} alt="" className="fill" />
            <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
            </div>
        </div>
        <div class="column-four">
        <img src={FILL} alt="" className="fill" />
            <div className="box">
                <p className="price">My Beloved Tee</p>
                <p className="curen">$35.55 USD</p>
            </div>
        </div>
    </div>
  </div>;
};

export default Four;
