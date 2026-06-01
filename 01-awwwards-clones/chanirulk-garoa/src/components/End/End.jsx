import "./end.css";
import K from "../img/ig.png";
import React from "react";

const End = () => {
  return <div className="end-cr">
    <div className="footer">
        <div className="batch">Garoa<sup>&#174;</sup></div>
        <p className="negative">
        Garoa is all about natural ingredients, we are a 100% transparent about the origin of all <br />
        the ingredients that we use in our products. The ingredients come mainly from Brazil's vast <br />
        Amazon rainforest and from the Scottish Highlands. With this combination of places we balance <br />
        ingredients from both cold, humid and warm, atlantic atlitudes. <br />
        <br />
        Your skin reacts different in the winter <br />
        from summer. our products treat your skin <br />
        with the proper vitamins for every season <br />
        so it's healthy year-round. <br />
        <br />
        Garoa<sup className="end-sup">&#174;</sup>
        </p>
        <div className="footer-links">
        <a href="https://www.instagram.com/chaniru.lk/" className="link-one">Shop</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="link-two">LookBook</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="link-three">legal</a>
        </div>
        <div className="footer-links-two">
        <a href="https://www.instagram.com/chaniru.lk/" className="link-one">About</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="link-two">Shoppingbag</a> <br />
        <a href="https://www.instagram.com/chaniru.lk/" className="link-three">contact</a>
        </div>
    </div>
    <a href="https://www.instagram.com/chaniru.lk/" className="tag-three">
        <img src={K} alt="" className="ig" />
    </a>
    <a href="https://www.instagram.com/chaniru.lk/" className="credit-link">@chaniru.lk Instagram</a>
    <p className="reserves">All rights reserved 2022 - chaniru.lk<sup className="end-sup">&#174;</sup></p>
  </div>;
};

export default End;
