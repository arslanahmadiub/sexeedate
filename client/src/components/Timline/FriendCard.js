import React, { useState, useRef } from "react";
import Slider from "./FriendSlider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userId } from "../../action/userIdAction";
import { showFriendVideo } from "../../action/friendRequestAction";
let { AgeFromDateString, AgeFromDate } = require("age-calculator");

function FriendCard() {
  const showCardDispatch = useDispatch();
  const showVideoDispatch = useDispatch();
  const node = useRef();
  const showFriendDetail = useSelector(
    (state) => state.friendRequest.friendRequestProfile
  );

  const showCard = useSelector((state) => state.friendRequest.friendVideoShow);

  let handelShow = (e) => {
    if (!node.current.contains(e.target)) {
      showVideoDispatch(showFriendVideo(false));
    }
  };
  let getAge = (data) => {
    let ageFromString = new AgeFromDateString(data).age;
    return ageFromString;
  };

  return (
    <div
      className={showCard ? "friendCard" : "friendCard1"}
      onClick={handelShow}
    >
      <div
        className="card "
        style={{ border: "3px solid #B71C1C", width: "400px" }}
        ref={node}
      >
        <div>
          <Slider  />

        </div>

        <div className="card-body">
          <h5 className="card-title">
            {showFriendDetail.length > 0
              ? showFriendDetail[0].Name.fullName
              : null}
          </h5>
          <h6 className="card-title">{showFriendDetail.length>0 ? getAge(showFriendDetail[0].Name.dob) :null} Years </h6>

          <p
            className="card-text"
            style={{ textAlign: "justify", lineHeight: "1.2em" }}
          >
            {showFriendDetail.length > 0
              ? showFriendDetail[0].Detail.bio
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
