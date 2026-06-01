import "./second.css";
import A from "../Img/1.png";
import B from "../Img/2.png";
import C from "../Img/3.png";
import D from "../Img/4.png";
import E from "../Img/5.png";
import F from "../Img/6.png";
import G from "../Img/7.png";
import H from "../Img/8.png";

import React from "react";

const Second = () => {
  return <div className="second">
   <div className="cate-links">
        <a href="#" className="link-1">Staples</a>
        <a href="#" className="link">New Arrivals<sup>8</sup></a>
        <a href="#" className="link-1">Bestsellers</a>
    </div>
    <div class="container">
	<div class="faders">
		<div class="left"></div>
		<div class="right"></div>
	</div>
	
	<div class="items">
		<div class="entry">
			<img src={A} alt="Portrait"/>
			<p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={B} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={C} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={D} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={E} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={F} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={G} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
		
		<div class="entry">
            <img src={H} alt="Portrait"/>
            <p class="quote">
                Soup Vegetables, Dehydrated <br />
                $4.30 - $8.00
			</p>
            <a href="#" class="tags">Non-GMO</a>
            <a href="#" class="tags-two">Vegan</a>
		</div>
	</div>
    </div>
  </div>;
};

export default Second;
