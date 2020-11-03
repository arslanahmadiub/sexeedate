import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSlider from "./UserSlider";

function UserCard(props) {
  return (
    <div
      className="card w-100"
      style={{ border: "3px solid #B71C1C", height: "305px" }}
    >
      <div>
        <UserSlider image={props.userImages} />
      </div>

      <div className="card-body"></div>
    </div>
  );
}

export default UserCard;
