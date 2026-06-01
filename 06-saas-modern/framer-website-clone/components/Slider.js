import React, { Component } from "react";
import Slider from "react-slick";

export default class AutoPlaySlider extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 8000,
            autoplaySpeed: 8000,
            centerPadding: "60px",
            centerMode: true,
            cssEase: "linear",
            arrows: false,
            pauseOnHover: false,
            vertical: this.props.isVertical,
            verticalSwiping: false,
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/y18BI7RiWORTMeVZFfgGi2WRU.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/EGOpYnd3MpapkwtEKosnQUrSuY.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/uPKaIli4tfeQtGnmHEyOLw0uYs.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/gsMYA38tnPfPHjxmLxSvV2uWI0.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/rfgSWjiTrB84tpUEqsj6KNlcFuE.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                    <div>
                        <img
                            src="https://framerusercontent.com/images/wkJF69cYYucYXHl6xkvxxkMb10.jpg"
                            alt="image"
                            height="200"
                            width="350"
                            style={{ borderRadius: "15px", opacity: ".6", margin: this.props.isVertical ? "auto" : "initial" }}
                            className="slider-image"
                        />
                    </div>
                </Slider>
            </div>
        );
    }
}
