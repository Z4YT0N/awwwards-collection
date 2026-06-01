import "./five.css";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import React from "react";
const Five = () => {
  return <div className="five">
    <a href="" className="shop">SHOP ALL</a>
    <lottie-player
  autoplay
  loop
  src="https://assets2.lottiefiles.com/packages/lf20_vd2u9dwv.json"></lottie-player>
    <div className="end-logo">Ranboo Fashion</div>
      <a href="https://www.instagram.com/chaniru.lk/" className="link-foot">Shop all</a><br />
      <br />
      <a href="https://www.instagram.com/chaniru.lk/" className="link-foot">about</a><br />
      <br />
      <a href="https://www.instagram.com/chaniru.lk/" className="link-foot">contact</a><br />
      <br />
      <a href="https://www.instagram.com/chaniru.lk/" className="link-foot">Instagram</a><br />
      <br />
      <a href="https://www.instagram.com/chaniru.lk/" className="link-foot">FAQ</a>
      <div className="credit">
        <a href="https://www.instagram.com/chaniru.lk/" className="credit-hover">Crafted by - @chaniru.lk</a>
      </div>
  </div>;
};

export default Five;
