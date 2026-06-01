import "./home.css";

import React from "react";

const Home = () => {
  return <div className="home">
    <div class='wrapper'>
            <input data-function='swipe' id='swipe' type='checkbox'/>
            <label data-function='swipe' for='swipe'>Menu</label>
                <div class='sidebar'>
                    <nav class='menu'>
                    <li><a href='#'>All</a></li>
                    <li><a href='#'>New&nbsp;Arrivals</a></li>
                    <li><a href='#'>Bestsellers</a></li>
                    <li><a href='#'>Staples</a></li>
                    </nav>
                    <nav class='menu-two'>
                    <li><a href='#'>Snacks</a></li>
                    <li><a href='#'>Herbs&nbsp;&&nbsp;Spices</a></li>
                    <li><a href='#'>Nuts&nbsp;&&nbsp;Seeds</a></li>
                    <li><a href='#'>Superfoods</a></li>
                    <li><a href='#'>Legumes</a></li>
                    <li><a href='#'>Candy&nbsp;&&nbsp;Chocolate</a></li>
                    <li><a href='#'>Herbs,&nbsp;Vinegars&nbsp;&&nbsp;Honey</a></li>
                    <li><a href='#'>Grains</a></li>
                    <li><a href='#'>Coffe&nbsp;&&nbsp;Tea</a></li>
                    <li><a href='#'>Cereal</a></li>
                    <li><a href='#'>Dried&nbsp;Fruit</a></li>
                    <li><a href='#'>Dehydrated</a></li>
                    <li><a href='#'>Pasta</a></li>
                    <li><a href='#'>Produce</a></li>
                    <li><a href='#'>Flours&nbsp;&&nbsp;Baking</a></li>
                    </nav>
                    <nav class='menu-three'>
                    <li><a href='#'>Bath&nbsp;&&nbsp;Body</a></li>
                    <li><a href='#'>Cleaning</a></li>
                    <li><a href='#'>Reusables</a></li>
                    </nav>
                    <nav class='menu-four'>
                    <li><a href='#'>Our&nbsp;Ethos</a></li>
                    <li><a href='#'>Account</a></li>
                    <li><a href='#'>FAQs</a></li>
                    <li><a href='#'>E-&nbsp;Gift&nbsp;Cards</a></li>
                    </nav>
                    <div className="button"><a href="#" class="myButton">Selecte Location</a></div>
                </div>
        </div>
  </div>;
};

export default Home;
