import React from 'react'
import img1 from '../../images/mod1.jpg'
import img2 from '../../images/mod2.png'
import img3 from '../../images/mod3.png'
import vid4 from '../../videos/background.mp4'

function FriendSlider() {
    return (
        <div
        id="carouselExample1"
        className="carousel slide z-depth-1-half"
        data-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            
             <video
              playsInline="playsinline"
              autoPlay="autoplay"
            
              loop="loop"
              muted
              style={{ 
                width:"100%", height:"300px",objectFit:"cover"
                }}
               
            >
              <source src={vid4} type="video/mp4" />
            </video>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={img1}
              alt="Second slide"
              style={{width:"100%" , height:"300px" ,objectFit:"fill"}}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={img2}
              alt="Third slide"
              style={{width:"250px" , height:"300px" ,objectFit:"fill"}}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
              style={{width:"250px" , height:"300px" ,objectFit:"fill"}}
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExample1"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExample1"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
}

export default FriendSlider
