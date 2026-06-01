import React from 'react';
import img1 from "../assets/5.png"
import img2 from "../assets/1.png"
import img3 from "../assets/3.png"
import img4 from "../assets/4.png"
import img5 from "../assets/2.png"

export default function Body() {
    return (
        <div className='body_section'>
            <div className="centered_element">
                <div className="body_detail_text">
                Hey! I am a front-end Developer, based in Sri Lanka
                Check out some of my projects I've made - 
                Hope yall like it...
                </div>
            </div>
            <div className="sticky">
                <div className="sticky_container" id="sticky_target">
                    <div className="big_heading"
                        data-scroll
                        data-scroll-sticky
                        data-scroll-target="#sticky_target"
                    >
                        RCLK
                    </div>
                </div>
                <div className="temp_text" >
                    <img className='scroll_img' src={img1} alt="" />
                    <p className='sticky_scroll_paragraph'>
                        registeredcars.lk (@RCLK) is a problem solver to the Sri Lankan Vehicle market. 
                        RCLK made its first moves on 2020 November and has stopped several proportion
                        of vehicles going out lead of owners... Their vision is to provide their 
                        customers with registered vehicles rather than it being open - paper...
                        <br/>
                        <br/>
                        wwww.registeredcars.lk
                    </p>
                    <div data-scroll data-scroll-id="paragraph1"></div>
                    <img className='scroll_img' src={img2} alt="" style={{ marginTop: "48rem" }} />
                    <p className='sticky_scroll_paragraph'>
                        re Grocery - Awwwwards remake - a movement to plastic free groceries...
                        Great Idea - to be honest. Build the site wasn't that hard but 
                        there were few things I wanted to change from the original site
                        since it wasn't my vibe - Hope yall like it 
                        Check it out on my GitHub / Instagram @chaniru.lk
                    </p>
                    <div data-scroll data-scroll-id="paragraph2"></div>
                    <img className='scroll_img' src={img3} alt="" style={{ marginTop: "48rem" }} />
                    <p className='sticky_scroll_paragraph'>
                        Calinann Oil - Awwwards remake - a Italian oil company. 
                        Amazing design - as usual I changed several things - 
                        Add some smooth movements. Scrollable div's - best design -
                        yeah... Check it out on my GitHub / Instagram @chaniru.lk
                    </p>
                    <div data-scroll data-scroll-id="paragraph3"></div>
                    <img className='scroll_img' src={img4} alt="" style={{ marginTop: "48rem" }} />
                    <p className='sticky_scroll_paragraph'>
                        DigitalWek - Awwwards remake - a minimal design 
                        and smooth zoom effects on  images - SOUNDS BETTER IN PERSON
                        Check it out on my GitHub / Instagram @chaniru.lk
                    </p>
                    <div data-scroll data-scroll-id="paragraph4"></div>
                    <img className='scroll_img' src={img5} alt="" style={{ marginTop: "48rem" }} />
                    <p className='sticky_scroll_paragraph'>
                        Diabla - Awwwards remake - for a outdoor furnisher company 
                        based on Spain. Amazing minimal red - duetone design. 
                        I'm obsessed...
                        Check it out on my GitHub / Instagram @chaniru.lk
                    </p>
                </div>
            </div>
            <div className="centered_element2">
                <div className="body_detail_text2">
                   That's not it. Check out my Instagram and GitHub for
                   constant Awwwards remakes...
                </div>
                <div className="find_out_link">
                    <a href='https://www.instagram.com/chaniru.lk/'>Find out more</a> 
                </div>
            </div>
        </div>
    );
}
