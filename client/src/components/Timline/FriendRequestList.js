import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMessage } from "../../action/userIdAction";
import { unreadMessages } from "../../action/userIdAction";
import { showFriendVideo } from "../../action/friendRequestAction";
import Button from "@material-ui/core/Button";

import "./Timeline.css";

import img1 from "../../images/img1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    background: "green",
  },
  mainContainer: {
    background: "#fff",
    padding: ".5rem",
  },
  subContainer: {
    background: "#F0F2F5",
  },
  titleContainer: {
    background: "#F0F2F5",

    width: "35rem",
  },
  textContainer: {
    background: "#d4d6d9",
    width: "100%",
    color: "black",
  },
  textField: {
    width: "100%",
    color: "black",
    fontSize: "800px",
  },
  multilineColor: {
    color: "red",
  },
  resize: {
    fontSize: 30,
    color: "black",
    lineHeight: 1,
  },
  large: {
    width: 60,
    height: 60,
  },
}));

function FriendRequestList(props) {
  const classes = useStyles();
  const [message, setMessage] = useState([]);
  const show = useSelector((state) => state.userId.showMessage);
  const friendMessages = useSelector((state) => state.userId.messageFriendList);
  const currentUser = useSelector((state) => state.userId.users[0]._id);
  const showDispatch = useDispatch();
  const unreadDispatch = useDispatch();
  const showVideoDispatch = useDispatch();
  const showCard = useSelector((state) => state.friendRequest.requestBoxShow);


    let showDetail =() =>{
        
        showVideoDispatch(showFriendVideo(true))
    }

  return (
    <div className={showCard ? "friend-box":"friend-box1"} >
      <div >
        <div id="friendItem">
          <Avatar alt="Remy Sharp" src={img1} className={classes.large} />
          <div id="messengerName">
            <h5 onClick={showDetail}>Arslan Ahmad</h5>

            <div>
              <Button variant="contained" color="primary">
                Accept
              </Button>
              <Button variant="contained" color="primary" style={{marginLeft:"10px"}}>
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestList;
