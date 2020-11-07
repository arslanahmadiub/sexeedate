import React, { useState } from "react";
import Slider from "./FriendSlider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userId } from "../../action/userIdAction";
import { showFriendVideo } from "../../action/friendRequestAction";


function FriendCard() {
  const showCardDispatch = useDispatch();
  const showVideoDispatch = useDispatch();

    const showCard = useSelector((state) => state.friendRequest.friendVideoShow);
  


let handelShow =()=>{
  showVideoDispatch(showFriendVideo(false))
}


  return (
    <div className={showCard ? "friendCard" :"friendCard1"} onClick={handelShow}>
      <div
        className="card "
        style={{ border: "3px solid #B71C1C", width: "400px" }}
      >
        <div>
          <Slider />
        </div>

        <div className="card-body">
          <h5 className="card-title">Arslan Ahmad</h5>
          <h6 className="card-title">23 Years </h6>

          <p
            className="card-text"
            style={{ textAlign: "justify", lineHeight: "1.2em" }}
          >
            My Name Is Arslan Ahmad I am a freelancer
          </p>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
