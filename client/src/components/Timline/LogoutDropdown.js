import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function LogoutDropdown() {
  const show = useSelector((state) => state.friendRequest.logout);
  const history = useHistory();

  let handelLogout = () => {
    history.push("/");
    localStorage.removeItem("token");
  };

  return (
    <div className={show ? "logoutCard" : "logoutCard1"}>
      <a style={{ color: "white", cursor: "pointer" }} onClick={handelLogout}>
        Do you want to Signout?
      </a>
    </div>
  );
}

export default LogoutDropdown;
