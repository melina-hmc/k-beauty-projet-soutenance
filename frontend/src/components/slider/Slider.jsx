import React, { useState , useEffect } from "react";
import { FaArrowCircleLeft , FaArrowCircleRight } from "react-icons/fa";
import { sliderData } from './Slider-data';
import { useNavigate } from "react-router";

function Slider(){
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const navigate = useNavigate();

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 4000;


    const nextSlide = () => {
        setCurrentSlide( currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };
    const prevSlide = () => {
        setCurrentSlide( currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    // auto scroll
    useEffect(() => {
        setCurrentSlide(0)
    },[])

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime)
            }
            auto()
        }
        return () => clearInterval(slideInterval)
    },[currentSlide, slideInterval, autoScroll]);

    return(
        <div className="slider">
            <FaArrowCircleLeft className="arrow prev" onClick={prevSlide} />
            <FaArrowCircleRight className="arrow next" onClick={nextSlide} />

            {sliderData.map((slide, index) => {
                const {image, heading, desc} = slide;
                return (
                    <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                        {index === currentSlide && (
                            <>
                                <img src={image} alt="slide" />
                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <button
                                        className="--btn --btn-primary"
                                        onClick={() => navigate("/shop")}
                                    >
                                        Voir
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                )
            })}


        </div>
    )
};

export default Slider;