import "./five.css";
import STOCK from "../img/5.jpeg";
import React from "react";

const Five = () => {
  return <div className="five">
    <hr className="hr" />
    <div className="download">Download</div>
    <div className="download-about">
        click here to check and download <br />
        our full range of products
        <a href="https://www.instagram.com/chaniru.lk/" className="down">Download ➤</a>
    </div>
    <div className="stock">
        <img src={STOCK} alt="" className="stock-vibor" />
    </div>
  </div>;
};

export default Five;
