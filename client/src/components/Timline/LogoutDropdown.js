import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { showLogout } from "../../action/friendRequestAction";
import { useDispatch } from "react-redux";

function LogoutDropdown(props) {
  const show = useSelector((state) => state.friendRequest.logout);
  const history = useHistory();
  const dispatchLogout = useDispatch();
  const showLogoutBadge = useSelector((state) => state.friendRequest.logout);
  useEffect(() => {
    handelLogoutBadge();
  }, [props.show]);

  let handelLogout = () => {
    history.push("/");
    localStorage.removeItem("token");
  };

  const handelLogoutCancel = async () => {
    dispatchLogout(showLogout(false));
  };
  const handelLogoutBadge = async () => {
    dispatchLogout(showLogout(props.show));
  };

  return (
    <div className={show ? "logoutCard" : "logoutCard1"}>
      <p style={{ color: "white", cursor: "pointer" }}>
        Do you really want to signout?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <button
          className="btn btn-danger"
          style={{ background: "#B71C1C", border: "1px solid #B71C1C" }}
          onClick={handelLogout}
        >
          Sign Out
        </button>
        <button
          className="btn btn-danger"
          style={{ background: "#B71C1C", border: "1px solid #B71C1C" }}
          onClick={handelLogoutCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LogoutDropdown;
