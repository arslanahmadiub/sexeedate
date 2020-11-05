import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMessage } from "../../action/userIdAction";
import { unreadMessages } from "../../action/userIdAction";

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
    width: 50,
    height: 50,
  },
}));

function MessageList(props) {
  const classes = useStyles();
  const [message, setMessage] = useState([]);
  const show = useSelector((state) => state.userId.showMessage);
  const friendMessages = useSelector((state) => state.userId.messageFriendList);
  const currentUser = useSelector((state) => state.userId.users[0]._id);
  const showDispatch = useDispatch();
  const unreadDispatch = useDispatch();


  useEffect(() => {
    if (friendMessages.length > 0) {
      setMessage(friendMessages);
    
      countUnread()
    }
  }, [friendMessages]);

  let handelClick = (e) => {
    props.change(e);
    showDispatch(showMessage(!show));

  };

  let countUnread =()=>{
    let count =0;
    for (let i=0; i<friendMessages.length; i++){
        if(friendMessages[i].receiverId === currentUser  && friendMessages[i].read ==false   ){
            count++
        }
    }
    
    unreadDispatch(unreadMessages(count))
  }

  return (
    <div className={show ? "notifi-box" : "notifi-box2"} id="box">
      {message.length > 0
        ? message.map((item, index) => {
            return (
              <div
                id="message"
                onClick={() => {
                  handelClick(item);
                }}
              >
                <div id="messageItem">
                  <Avatar
                    alt="Remy Sharp"
                    src={item.avatar}
                    className={classes.large}
                  />
                  <div id="messengerName">
                    <h5>{item.name}</h5>

                    <div className={item.read ? "block-ellipsis" : "block-ellipsis-unread"}>{item.lastMessage}</div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default MessageList;
