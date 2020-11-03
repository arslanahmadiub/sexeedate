import React from "react";

function UserSlider(props) {
  return (
    <div
      id="carouselExample1"
      className="carousel slide z-depth-1-half"
      data-ride="carousel"
      data-interval="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={props.image[0].imageUrl}
            alt="Second slide"
            style={{ width: "100%", height: "300px", objectFit: "fill" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={props.image[1].imageUrl}
            alt="Third slide"
            style={{ width: "250px", height: "300px", objectFit: "fill" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={props.image[2].imageUrl}
            alt="Third slide"
            style={{ width: "250px", height: "300px", objectFit: "fill" }}
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
  );
}

export default UserSlider;
