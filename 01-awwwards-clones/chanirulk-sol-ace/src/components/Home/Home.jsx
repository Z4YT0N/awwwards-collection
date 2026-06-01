import "./home.css";
import DROP from "../img/drop.mp4";
import SET1 from "../img/li1.jpg";
import SET2 from "../img/li2.png";
import SET3 from "../img/scene3.png";
import SET4 from "../img/deco2.png";
import SET5 from "../img/deco4.png";
import React from "react";

const Home = () => {
  return <div className="home">
     <div className="logo">Sol'ace</div>
    <div class='wrapper'>
            <input data-function='swipe' id='swipe' type='checkbox'/>
            <label data-function='swipe' for='swipe'>Shop&nbsp;<span className="brown">&raquo;</span></label>
                <div class='sidebar'>
                    <nav class='menu'>
                    <h1 className="shop-head">sol'ace</h1>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>Home</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>about</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>journal</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>contact</a></li>
                    </nav>
                    <nav class='menu-two'>
                    <h1 className="shop-head-two">shop</h1>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>all</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>lookbook</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>collections</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>featured</a></li>
                    </nav>
                    <nav class='menu-three'>
                    <h1 className="shop-head-three">collections</h1>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>decors</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>furniture</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>ceramic</a></li>
                    <li><a href='https://www.instagram.com/chaniru.lk/'>lamps</a></li>
                    </nav>
                    <div class="marquee">
	                    <div class="marquee__inner" aria-hidden="true">
                      <span>The</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
		                    <span>sol'ace</span>
	                    </div>
                    </div>
                </div>
        </div>
      <div className="gallery">
        <div className="slide">
        <div className="head">
          seamless furniture <br />
          with natural fabrics
        </div>
        <a href="https://www.instagram.com/chaniru.lk/" class="myButton">Shop all</a>
          <video autoPlay loop muted src={DROP} className="drop"></video>
        </div>
        <div className="slide-two">
        <div className="set-one">
            <img src={SET1} alt="" className="set-fill" />
          </div>
          <div className="set-three">
            <img src={SET2} alt="" className="set-fill" />
          </div>
          <div className="set-two">
            <img src={SET3} alt="" className="set-fill" />
          </div>
          <div className="set-four">
            <img src={SET4} alt="" className="set-fill" />
          </div>
          <div className="set-five">
            <img src={SET5} alt="" className="set-fill" />
          </div>
          <p className="create">
            creating perfect <br />
            lines and impossing <br />
            presence
          </p>
          <p className="create-des">
          Developed the concept of exclusivity, a Sol'ace features timeless furniture, with natural <br />
          fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated <br />
          into any decor project. The pieces enchant for their sobriety, to last for generations, <br />
          faithful to the shaped of each period, with a touch of the present
          </p>
          <a href="https://www.instagram.com/chaniru.lk/" class="myButton-two">read about us</a>
        </div>
      </div>
  
  </div>;
};

export default Home;
