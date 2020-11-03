import React from "react";

import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import vid4 from '../../videos/background.mp4'


function Slider() {
  return (
    <div
      id="carouselExample2"
      className="carousel slide z-depth-1-half"
      data-ride="carousel"
      data-interval="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          {/* <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          /> */}
           <video
            playsInline="playsinline"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            style={{ 
              width:"250px", height:"250px",objectFit:"cover"
              }}
          >
            <source src={vid4} type="video/mp4" />
          </video>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
            style={{width:"250px" , height:"250px"}}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
            style={{width:"250px" , height:"250px"}}
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExample2"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExample2"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Slider;
