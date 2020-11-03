import React, { Component } from 'react'
import img1 from '../../images/mod1.jpg'
import img2 from '../../images/mod2.png'
import img3 from '../../images/mod3.png'
import vid4 from '../../videos/background.mp4'



 class Slider extends Component {
  render() {
  
      return (
        <div
          id={`carouselExample${this.props.id}`}
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
                <source src={this.props.video} type="video/mp4" />
              </video>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={this.props.images[0].imageUrl}
                alt="Second slide"
                style={{width:"100%" , height:"300px" ,objectFit:"fill"}}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={this.props.images[1].imageUrl}
                alt="Third slide"
                style={{width:"250px" , height:"300px" ,objectFit:"fill"}}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={this.props.images[2].imageUrl}
                alt="Third slide"
                style={{width:"250px" , height:"300px" ,objectFit:"fill"}}
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href={`#carouselExample${this.props.id}`}
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={`#carouselExample${this.props.id}`}
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
       
    )
  }
}

export default Slider
