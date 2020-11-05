import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useHistory } from "react-router";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import modelImage from "../../images/mod2.png";
import { useDispatch } from "react-redux";
import { userId } from "../../action/userIdAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { showMessage } from "../../action/userIdAction";
import Badge from '@material-ui/core/Badge';

import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { userImageGet } from "../../services/friendGet";
import { deCodeId } from "../../services/userId";
import { getFullUserDetail } from "../../services/profile";
import { useSelector } from "react-redux";

import "./Timeline.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "green",
  },

  large: {
    width: 25,
    height: 25,
  },
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "#fff"
  }
}));

export default function SearchAppBar() {
  let [userImage, setUserImage] = useState("");
  let [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const users = useSelector(
    (state) => state.userId.users[0].Detail.userImages.imageUrl
  );
  const show = useSelector((state) => state.userId.showMessage);
  
  const unread = useSelector((state) => state.userId.unreadMessages);
    
  useEffect(() => {
    if (users && userImage.length < 1) {
      setUserImage(users);
    }
  }, [users]);

  const history = useHistory();
  const handelTimeline = () => {
    history.push("/timeline");
  };
  const handelHome = () => {
    history.push("/basicInfo");
  };
  const handelMessenger = () => {
    // history.push("/chat");
    dispatch(showMessage(!show));

  };
  const handelFavrot = () => {
    history.push("/home");
  };
  const handelLogout = async () => {
    history.push("/");
    localStorage.removeItem("token")
    

  };

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  let fetchCurrentImage = async () => {
    let id = await deCodeId();
    let userId = { userId: id };
    let { data } = await userImageGet(userId);

    if (data.length > 0) {
      let image = data[0].User.userImages[0];

      setUserImage(image.imageUrl);
      setUserName(data[0].firstName);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <div
          style={{ background: "#100C08 ", color: "black", overflow: "hidden" }}
        >
          <Toolbar>
            <div className="toolbarItems">
              <h4 style={{ color: "#B71C1C" }}> Sexee Date</h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "20vw",
                position: "absolute",
                top: "5",
                right: "0",
              }}
            >
              <div className="toolbarItems">
                <IconButton
                  onClick={handelTimeline}
                  style={{ boxShadow: "none" }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={userImage}
                    className={classes.large}
                  />
                </IconButton>
              </div>
              <div className="toolbarItems">
                <IconButton onClick={handelHome} style={{ boxShadow: "none" }}>
                  <h6>{userName.length > 0 ? userName : "Profile"}</h6>
                </IconButton>
              </div>
              <div className="toolbarItems">
                <IconButton onClick={handelMessenger}>
                <Badge badgeContent={unread} color="primary" classes={{ badge: classes.customBadge }}>
      
                  <ChatBubbleIcon
                    style={{
                      color: "#B71C1C",
                    }}
                  />
      </Badge>
                </IconButton>
              </div>
              <div className="toolbarItems">
                <IconButton onClick={handelFavrot}>
                  <FavoriteIcon
                    style={{
                      color: "#B71C1C",
                    }}
                  />
                </IconButton>
              </div>
              <div className="toolbarItems">
                <IconButton onClick={handelLogout}>
                  <ExitToAppIcon
                    style={{
                      color: "#B71C1C",
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}
