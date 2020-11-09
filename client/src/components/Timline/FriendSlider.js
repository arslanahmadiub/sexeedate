import React, { useState, useEffect,useRef } from "react";
import img1 from "../../images/mod1.jpg";
import img2 from "../../images/mod2.png";
import img3 from "../../images/mod3.png";
import vid4 from "../../videos/background.mp4";
import { useSelector } from "react-redux";

function FriendSlider(props) {
  const showFriendDetail = useSelector(
    (state) => state.friendRequest.friendRequestProfile
  );
  const myRef = useRef();

  const [video, setvideo] = useState("");
  useEffect(() => {
    
    if( video.length <1 && showFriendDetail.length>0){

      setvideo(showFriendDetail[0].Detail.video.image_url);
      myRef.current.load()
    }
     
    
  },[showFriendDetail]);


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
            controls
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
            ref={myRef}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={
              showFriendDetail.length > 0
                ? showFriendDetail[0].Detail.userImages[0].imageUrl
                : null
            }
            alt="Second slide"
            style={{ width: "100%", height: "300px", objectFit: "fill" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={
              showFriendDetail.length > 0
                ? showFriendDetail[0].Detail.userImages[1].imageUrl
                : null
            }
            alt="Third slide"
            style={{ width: "250px", height: "300px", objectFit: "fill" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={
              showFriendDetail.length > 0
                ? showFriendDetail[0].Detail.userImages[2].imageUrl
                : null
            }
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

export default FriendSlider;
