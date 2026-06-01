import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import './styles.css';
import './locomotive-scroll.css';
import video from "./assets/back.mp4";
import logo from "./assets/logo.png";
import advert1 from "./assets/advert.png";
import advert2 from "./assets/advert2.png";
import slide1 from "./assets/product.png";
import slide2 from "./assets/product2.png";
import slide3 from "./assets/product3.png";
import hover1 from "./assets/hover1.png";
import hover2 from "./assets/hover2.png";
import hover3 from "./assets/hover3.png";
import mar1 from "./assets/mar1.png";
import marvid from "./assets/marhover.mp4";
import mar2 from "./assets/mar2.png";
import marvid2 from "./assets/marhover2.mp4";
import mar3 from "./assets/mar4.png";
import marvid3 from "./assets/marhover3.mp4";
export default function App() {
  const containerRef = useRef(null);

  const Container = styled.div`
   
  `;

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        lerp: 0.05,
        multiplier: 2,
        firefoxMultiplier: 2,
        touchMultiplier: 0.1,
        smartPhone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <Container data-scroll-container ref={containerRef}>
        <section  className='hero'>
            <div className='back-drop' data-scroll>
                <img src={logo} className='logo-batch'></img>
                <div className='small-text'>
                  creative developer based in sri - lanka. <br></br>
                  no sacrifice to achieve a premium quality web experience. <br></br>
                  let's make a change to the digital era together. <br></br>
                  &copy; chaniru.lk - the change
                </div>
                <div className='text-clip-one'>
                  &copy; chaniru.lk, draw inspiration <br></br>
                  and purpose through the art <br></br>
                  of innovation...
                </div>
                <div className='text-clip-two'>
                  a change is what is needed in the <br></br> 
                  digital era, as each of these websites <br></br>
                  meet user experience to the finest, <br></br>
                  as it is important to be in standard.
                </div>
                <video className='drop-vid' autoPlay loop muted>
                <source src={video} type="video/mp4"/>
                </video>
                <div className='slide-one' data-scroll>
                  <div class="row">
                    <div class="column">
                    <img src={advert1} alt="advert" className='slide-pic'/>
                    </div>
                    <div class="column">
                    <img src={advert2} alt="advert" className='slide-pic'/>
                    </div>
                  </div>
                  <div className='one-small-text'>
                    untangible access to the best web experience on the digital space. <br></br>
                    only to those who grandfathered into the digital network. begin your era <br></br>
                    with chaniru.lk and access the innovative experience. <br></br>
                    fint the possible...
                  </div>
                  <div className='two-small-text'>
                    explore the possibilities. <br></br>
                    of tailored craftmenship of codes, <br></br>
                    with unlimited capabilites...
                  </div>
                  <div className='three-small-text'>
                    explore the possibilities. <br></br>
                    of tailored craftmenship of codes, <br></br>
                    with unlimited capabilites...
                  </div>
                  <div className='services'>
                    Web Development
                  </div>
                  <div className='ser-doter'>
                    est 2017
                  </div>
                  <div className='services-des'>
                    The Ultimate Experience
                  </div>
                </div>
                <div className='slide-two'>
                  <div className='type-one'>
                    bridal
                  </div>
                  <div className='type-one-sub'>
                    timeless heirlooms crafted with <br></br>
                    premier biamantaries.
                  </div>
                  <div className='sub-num'>1</div>
                  <div className='type-two'>
                    custom
                  </div>
                  <div className='type-two-sub'>
                    timeless heirlooms crafted with <br></br>
                    premier biamantaries.
                  </div>
                  <div className='sub-num-two'>2</div>
                  <div className='type-three-sub'>
                    unatainable access, given to a limited few that have only <br></br>
                    been available to those grandfathered into the global <br></br>
                    network. begin your search with ore and access <br></br>
                    the unatainable. find the impossible.
                  </div>
                  <div className='type-three'>
                    sourcing
                  </div>
                  <div className='sub-num-three'>3</div>
                  <form className='sliderr'>
                  <input type="radio" name="fancy" autofocus value="clubs" id="clubs" />
			            <input type="radio" name="fancy" value="hearts" id="hearts" />
			            <input type="radio" name="fancy" value="spades" id="spades" />
			            <input type="radio" name="fancy" value="diamonds" id="diamonds" />			
			            <label for="clubs">
                    <img src={slide1} className='pic-on-one'></img>
                  </label><label for="hearts"><img src={slide3} className='pic-on-one'></img>
                  </label><label for="spades"><img src={slide2} className='pic-on-one'></img>
                  </label><label for="diamonds"><img src={slide3} className='pic-on-one'></img>
                  </label>
			              <div class="keys"></div>
	              </form>
                <div className='work'>our work</div>
                <div className='work-cre'>chaniru.lk</div>
                </div>
                <div className='slide-three'>
                  <a  href='https://www.instagram.com/chaniru.lk/' className='hovering-two-link'>bridal</a>
                  <img src={hover3} className='hovering-pic-two'></img>
                  <div className='projec-one-sub'>
                    timeless heirlooms crafted with <br></br>
                    premier biamantaries.
                  </div>
                  <div className='projec-num'>1</div>
                  <a  href='https://www.instagram.com/chaniru.lk/' className='hovering-one-link'>custom</a>
                  <img src={hover2} className='hovering-pic-one'></img>
                  <div className='projec-two-sub'>
                    timeless heirlooms crafted with <br></br>
                    premier biamantaries.
                  </div>
                  <div className='projec-num-two'>2</div>
                  <div className='projec-three-sub'>
                    unatainable access, given to a limited few that have only <br></br>
                    been available to those grandfathered into the global <br></br>
                    network. begin your search with ore and access <br></br>
                    the unatainable. find the impossible.
                  </div>
                  <a  href='https://www.instagram.com/chaniru.lk/' className='hovering'>sourcing</a>
                  <img src={hover1} className='hovering-pic'></img>
                  <div className='projec-num-three'>3</div>
                  <div className='big-type'>portfolio</div>
                </div>
                <div className='slide-four'>
                  <div className='styl'>022 - 06 - 2022</div>
                  <div className='big-type-two'>projects</div>
                  <div class="row-projectile">
                    <div class="column-projectile" >
                      <div className='box-mar'>
                        <a href='https://www.instagram.com/chaniru.lk/' className='test'>hover</a>
                        <img src={mar1} className='mar-pic'></img>
                        <video className='hover-vid' autoPlay loop muted>
                        <source src={marvid} type="video/mp4"/>
                        </video>
                        <p className='wayer'>ore x ck</p>
                      </div>
                    </div>
                  <div class="column-projectile" >
                      <div className='box-mar'>
                      <a href='https://www.instagram.com/chaniru.lk/' className='test-two'>hover</a>
                        <img src={mar2} className='mar-pic-two'></img>
                        <video className='hover-vid-two' autoPlay loop muted>
                        <source src={marvid2} type="video/mp4"/>
                        </video>
                        <p className='wayer-two'>ore x richard</p>
                      </div>
                  </div>
                  <div class="column-projectile" >
                  <div className='box-mar'>
                  <a href='https://www.instagram.com/chaniru.lk/' className='test-three'>hover</a>
                        <img src={mar3} className='mar-pic-three'></img>
                        <video className='hover-vid-three' autoPlay loop muted>
                        <source src={marvid3} type="video/mp4"/>
                        </video>
                        <p className='wayer-three'>ore x drake</p>
                      </div>
                  </div>
                  </div>
                </div>
            </div>
        </section>
        <span className='credit' data-scroll> &copy; chaniru.lk </span>
        <span className='credit-two' data-scroll> &copy; creative developer - sri lanka </span>
      </Container>
    </LocomotiveScrollProvider>
  );
}
