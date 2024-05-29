import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./data";

// n'hésite pas a regarder la documentaion officiel sur le caroussel (video: 2h10)

function ProductCarousel({ products}){
    return(
        <div>
            <Carousel 
                showDots={false}
                responsive={responsive}
                infinite={true}
                autoPlay= {true}
                autoPlaySpeed={3000}
                customTransition="all 500ms ease"
                transitionDuration={1000}
            >
                {products}
            </Carousel>

        </div>
    )
};

export default ProductCarousel;