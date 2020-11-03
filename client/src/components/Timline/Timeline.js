import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";
import moment from "moment";

import Inputcard from "./Inputcard";
import Eventcard from "./Eventcard";
import Avatar from "@material-ui/core/Avatar";
import modelImage from "../../images/mod2.png";
import "./Timeline.css";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SearchAppBar from "./SearchAppBar";
import { friendGet } from "../../services/friendGet";
import { deCodeId } from "../../services/userId";
import { chatGet } from "../../services/chat";
import { postGet } from "../../services/post";
import {useDispatch} from 'react-redux'
import {getFullUserDetail} from '../../services/profile'
import {userId} from '../../action/userIdAction'

import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Chatbox from "./Chatbox";
import MessageList from "./MessageList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainContainer: {
    position: "absolute",
    background: "#100C08 ",
    height: "90vh",
    width: "100vw",
    marginTop: "4rem",
    color: "white",
    overflow: "hidden",
  },
  link: {
    color: "green",
    alignContent: "center",
  },
}));

function Timeline() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [postData, setPostData] = useState([]);
  const dispatch = useDispatch();

  const [friendData, setFriendData] = useState({
    friendId: "",
    friendName: "",
    friendImage: "",
  });

  const classes = useStyles();
  const history = useHistory();

  let [friend, setFriend] = useState([]);

  useEffect(() => {
    fetchFriendList();
    fetchPostData();
    setUser();
  }, []);

  const handleMessenger = () => {
    history.push("/chat");
  };
  const handleMatching = () => {
    history.push("/home");
  };
  const handleProfile = () => {
    history.push("/work");
  };
  const handleLogout = () => {
    history.push("/");
  };

  const myRef = useRef();

  const handelFriendClick = async (e) => {
    await setShowChatBox(true);

    await setFriendData(e);
    myRef.current.fetchMessages();
  };

  const closeChatBox = async (e) => {
    await setShowChatBox(false);
  };

  let fetchFriendList = async () => {
    let id = await deCodeId();
    let userId = { userId: id };
    let { data } = await friendGet(userId);
    let friendArray = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].User.length > 0) {
        let friendData = {
          friendId: data[i]._id,
          friendImage: data[i].User[0].userImages[0].imageUrl,
          friendName: data[i].firstName + " " + data[i].lastName,
        };
        friendArray.push(friendData);
      }
    }

    if (data) {
      setFriend(friendArray);
    }
  };

  let fetchPostData = async () => {
    let { data } = await postGet();
    await setPostData(data);
  };
  let getTime = (data) => {
    const m2 = moment(data);
    return m2.fromNow();
  };

  let setUser = async () => {
    let id = {
      userId: "5f97b6c20cfdf8340cc2c004",
    };
    let { data } = await getFullUserDetail(id);

     dispatch(userId(data));
  };

  return (
    <div className={classes.root}>
      <MessageList/>
      <SearchAppBar />

      <Grid container className={classes.mainContainer}>
        <Chatbox
          show={showChatBox}
          close={() => closeChatBox()}
          name={friendData.friendName}
          image={friendData.friendImage}
          id={friendData.friendId}
          ref={myRef}
        />

        <Grid
          item
          xs={9}
          className={classes.link}
          style={{
            display: "flex",
            alignItems: "center",

            height: "100vh",
            width: "100vw",
            background: "#100C08 ",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <div style={{ overflow: "auto", marginBottom: "4rem" }}>
            <Inputcard />
            <br />
            {postData.map((item, index) => {
              return (
                <Eventcard
                  name={item.Name.fullName}
                  time={getTime(item.dateTime)}
                  message={item.message}
                  image={item.UserImage.userImages.imageUrl}
                />
              );
            })}

            <br />
          </div>
        </Grid>

        <Grid
          item
          xs={3}
          className={classes.link}
          style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            overflow: "auto",
            borderLeft: "3px solid  #B71C1C",
          }}
        >
          <div
            style={{
              overflow: "auto",
              width: "100%",
              marginLeft: "10px",
              marginBottom: "5rem",
            }}
          >
            <form className="form-inline position-relative mt-3 mr-2">
              <input
                type="search"
                className="form-control"
                id="conversations"
                placeholder="Search Friend..."
              />
            </form>

            {friend.map((item, id) => {
              return (
                <div key={item.friendId}>
                  <div
                    className="friendsList"
                    onClick={() => handelFriendClick(item)}
                    key={item.friendId}
                  >
                    <Avatar alt="Remy Sharp" src={item.friendImage} />
                    <h5>{item.friendName}</h5>
                  </div>
                  <hr
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      color: "red",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Timeline;
