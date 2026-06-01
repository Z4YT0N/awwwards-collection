import "./six.css";
import STTAR from  "../img/star3.png";
import PURPF from "../img/Footercopy.png";
import SUNNER from "../img/Infra3.png";
import ARW from "../img/dial.png";
import React from "react";

const Six = () => {
  return <div className="six">
    <img src={STTAR} alt="" className="spiner" />
    <div className="join-head">
        Join our <br />
        Community
    </div>
    <img src={SUNNER} alt="" className="sunner" />
    <img src={PURPF} alt="" className="pic-right" />
    <a className="member" href="https://www.instagram.com/chaniru.lk/">Learn more about membership</a>
    <img src={ARW} alt="" className="arw-svg" />
    <div className="credit-ig">Get socials with us</div>
    <div className="tag-end">
        <a href="https://www.instagram.com/chaniru.lk/" className="line-end">Tik tok</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="line-end">instagram</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="line-end">facebook</a>
    </div>
    <div className="end-line"><a href="https://www.instagram.com/chaniru.lk/">@chaniru.lk - Instagram</a></div>
  </div>;
};

export default Six;
