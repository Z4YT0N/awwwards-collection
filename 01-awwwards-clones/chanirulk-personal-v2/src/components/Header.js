import React from 'react';
import A from "../assets/drop.mp4"
export default function Header() {
    return (
        <>
            <div className="nav">
                <div className='empty'></div>
                <div className="tagline">
                    Web Developer - Enterprenuer - Designer
                </div>
                <div className="nav_menu">
                    <a href=''><span className="menu_title">INSTAGRAM?</span></a>
                </div>
            </div>
            <div className="heading" data-scroll data-scroll-id="black">
                CHANIRU KODITHUWAKKUGE
            </div>
            <hr></hr>
            <div className="video_section" data-scroll>
                <video autoPlay loop muted width="100%" height="100%">
                    <source src={A} />
                </video>
            </div>
        </>
    );
}
