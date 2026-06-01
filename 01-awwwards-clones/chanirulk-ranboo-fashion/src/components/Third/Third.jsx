import "./third.css";
import IT1 from "../img/ranboo001.png";
import IT2 from "../img/ranboo002.png";
import React from "react";

const Third = () => {
  return <div className="third">
    <svg fill="#ffffff" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="arrow">
        <path xmlns="http://www.w3.org/2000/svg" d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L16 14.5858L16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9L18 17C18 17.5523 17.5523 18 17 18H9C8.44771 18 8 17.5523 8 17C8 16.4477 8.44771 16 9 16H14.5858L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z" fill="#ffffff"></path>
    </svg>
    
    <div class="row">
        <div class="column">
        <p className="text-small">
        A collection of bad ideas come to fruition as real products for <br />
        you to experience. <br />
        <br />
        The collection contains a range of products designed to <br />
        emulate his signature black and white style. With the Ranboo <br />
        collection, you can take a bad idea and make it your own.
        </p>
        <a href="#" class="myButton">View all 9 items</a>
        </div>
        <div class="column">
        <p className="odd">Once again <span>Ranboo</span> <br />
            deifes the odds with the <br />
            <span>2k21 Ranboo collection</span>.
        </p>
        </div>
    </div>
    <hr className="line-seg" />
    <p className="pic-text">
        Ranboo presents <img src={IT1} alt="" className="log-it" /> bad Ideas
        for all to see <img src={IT2} alt="" className="log-it" /> Have fun!
    </p>
    <hr className="line-mar" />
    <div class="marquee">
	<div class="marquee__inner" aria-hidden="true">
		<span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
		<span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
        <span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
        <span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
        <span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
        <span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
        <span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
        <span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
        <span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
        <span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
        <span>The</span>
		<span>Ranboo</span>
		<span>Collection</span>
		<span>2022&copy;</span>
        <span className="bold">It</span>
		<span className="bold">ain't</span>
		<span className="bold">easy</span>
		<span className="bold">being</span>
		<span className="bold">this</span>
		<span className="bold">bold</span>
		<span className="bold">│</span>
	</div>
    </div>
  </div>;
};

export default Third;
