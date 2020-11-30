import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";
import moment from "moment";

import Inputcard from "./Inputcard";
import Eventcard from "./Eventcard";
import Avatar from "@material-ui/core/Avatar";

import { getFriendWithChat } from "../../services/chat";

import "./Timeline.css";

import SearchAppBar from "./SearchAppBar";
import { friendGet } from "../../services/friendGet";
import { deCodeId } from "../../services/userId";

import { postGet } from "../../services/post";
import { findRequest } from "../../services/friendGet";
import { useDispatch } from "react-redux";
import { getFullUserDetail } from "../../services/profile";
import { userId } from "../../action/userIdAction";
import { messageFriendList } from "../../action/userIdAction";

import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Chatbox from "./Chatbox";
import MessageList from "./MessageList";
import { unreadMessages } from "../../action/userIdAction";
import { setFriendRequestData } from "../../action/friendRequestAction";
import FriendRequestList from "./FriendRequestList";
import FriendCard from "./FriendCard";
import LogoutDropdown from "./LogoutDropdown";

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
  const [showAlert, setShowAlert] = useState(false);
  const [userProStatus, setUserProStatus] = useState("");
  const [userProDate, setUserProDate] = useState("");

  const dispatch = useDispatch();
  const showDispatch = useDispatch();
  const friendRequestDispatch = useDispatch();

  const friendDispatch = useDispatch();
  const show = useSelector((state) => state.userId.showMessage);
  const unreadDispatch = useDispatch();
  const friendMessages = useSelector((state) => state.userId.messageFriendList);
  const currentUser = useSelector((state) => state.userId.users[0]._id);
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
    fetchChataData();
  }, []);

  useEffect(() => {
    getFriendRequest();
  }, [currentUser]);

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

    let friendData = {
      friendId: e.userId,
      friendName: e.Detail.fullName,
      friendImage: e.userImages.imageUrl,
    };
    await setFriendData(friendData);
    myRef.current.fetchMessages();
    myRef.current.getChatNumber();
    myRef.current.userSubscription();
  };

  let getFriendRequest = async () => {
    if (currentUser.length > 0) {
      let user = {
        userId: currentUser,
      };
      let { data } = await findRequest(user);

      await friendRequestDispatch(setFriendRequestData(data));
    }
  };

  const closeChatBox = async (e) => {
    await setShowChatBox(false);
  };

  let fetchFriendList = async () => {
    let id = await deCodeId();
    let userId = { userId: id };
    let { data } = await friendGet(userId);

    if (data) {
      setFriend(data);
    }
  };

  let handelProfileComplete = () => {
    history.push("/basicInfo");
  };

  let fetchPostData = async () => {
    let userId = await deCodeId();
    let id = {
      userId: userId,
    };

    let { data } = await postGet(id);

    await setPostData(data);
  };
  let getTime = (data) => {
    const m2 = moment(data);
    return m2.fromNow();
  };

  let setUser = async () => {
    let result = await deCodeId();
    let id = {
      userId: result,
    };
    let { data } = await getFullUserDetail(id);

    if (data.length === 0) {
      setShowAlert(true);
    }

    if (data.length > 0) {
      setUserProStatus(data[0].subStatus);
      setUserProDate(data[0].subOverDate);
      dispatch(userId(data));
    }
  };

  let fetchChataData = async () => {
    let id = await deCodeId();
    let userId = { userId: id };

    let { data } = await getFriendWithChat(userId);

    let friendArray = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].Chat.length > 0) {
        let friend = {
          name: data[i].fullName,
          avatar: data[i].Image.userImages.imageUrl,
          lastMessage: data[i].Chat[data[i].Chat.length - 1].message,
          id: data[i]._id,
          read: data[i].Chat[data[i].Chat.length - 1].read,
          senderId: data[i].Chat[data[i].Chat.length - 1].senderId,
          receiverId: data[i].Chat[data[i].Chat.length - 1].receiverId,
        };
        friendArray.push(friend);
      }
    }
    friendDispatch(messageFriendList(friendArray));
  };

  let friendId = async (e) => {
    let data = {
      friendId: e.id,
      friendName: e.name,
      friendImage: e.avatar,
    };
    setFriendData(data);
    await setShowChatBox(true);
    myRef.current.fetchMessages();
    myRef.current.getChatNumber();
  };

  let showChat = async (e) => {
    let data = {
      friendId: e.userId,
      friendName: e.name,
      friendImage: e.image,
    };
    if (e.userId !== currentUser) {
      setFriendData(data);
      await setShowChatBox(true);
      myRef.current.fetchMessages();
      myRef.current.getChatNumber();
    }
  };

  let countUnread = () => {
    fetchChataData();
    let count = 0;
    for (let i = 0; i < friendMessages.length; i++) {
      if (
        friendMessages[i].receiverId === currentUser &&
        friendMessages[i].read == false
      ) {
        count++;
      }
    }

    unreadDispatch(unreadMessages(count));
  };

  return (
    <div className={classes.root}>
      <MessageList
        change={(data) => {
          friendId(data);
        }}
      />
      <FriendRequestList />
      <SearchAppBar />
      <FriendCard />
      <LogoutDropdown />

      <Grid container className={classes.mainContainer}>
        <Chatbox
          show={showChatBox}
          close={() => closeChatBox()}
          name={friendData.friendName}
          image={friendData.friendImage}
          id={friendData.friendId}
          update={() => countUnread()}
          userStatus={userProStatus}
          userEndDate={userProDate}
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
          <Alert
            show={showAlert}
            variant="danger"
            style={{ zIndex: "400000", margin: "20%" }}
          >
            <Alert.Heading>Complete your profile first...</Alert.Heading>
            <p>Click on button below to complete your profile.</p>
            <hr />
            <div className="d-flex justify-content-end">
              {/* <Button variant="outline-success" onClick={handelProfileComplete}>
                Click
              </Button> */}
              <button
                className="btn-hover1 color-10"
                onClick={handelProfileComplete}
                style={{ marginTop: "0px" }}
              >
                Click
              </button>
            </div>
          </Alert>
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
                  userId={item.userId}
                  showChat={(data) => {
                    showChat(data);
                  }}
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
            {/* <form className="form-inline position-relative mt-3 mr-2">
              <input
                type="search"
                className="form-control"
                id="conversations"
                placeholder="Search Friend..."
              />
            </form> */}

            {friend.map((item, id) => {
              return (
                <div key={id}>
                  <div
                    className="friendsList"
                    onClick={() => handelFriendClick(item)}
                  >
                    <Avatar alt="Remy Sharp" src={item.userImages.imageUrl} />
                    <h5>{item.Detail.fullName}</h5>
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
