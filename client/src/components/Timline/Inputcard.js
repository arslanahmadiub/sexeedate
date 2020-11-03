import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import Button from "@material-ui/core/Button";
import moment from 'moment';

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import modelImage from "../../images/mod2.png";
import Dialog from "@material-ui/core/Dialog";

import TextField from "@material-ui/core/TextField";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { userImageGet } from "../../services/friendGet";

import { deCodeId } from "../../services/userId";
import { postPost } from "../../services/post";
import {useSelector} from 'react-redux'

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

export default function Inputcard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let [userImage, setUserImage] = useState("");
  let [currentUser, setCurrentUser] = useState("");
  let [eventMessage, setEventMessage] = useState("");
  const users = useSelector((state) => state.userId.users[0].Detail.userImages.imageUrl);


  

   
    
  useEffect(()=>{
    if(users && userImage.length<1){
      setUserImage(users)
    
      
     }
   },[users])
   

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCurrentUser();
   
    getTime()
    
  },[]);

  // let fetchCurrentImage = async () => {
  //   let id = await deCodeId();
  //   let userId = { userId: id };
  //   let { data } = await userImageGet(userId);

  //   if (data.length > 0) {
  //     let image = data[0].User.userImages[0];

  //     setUserImage(image.imageUrl);
  //   }
  // };

  let fetchCurrentUser = async () => {
    let id = await deCodeId();
    await setCurrentUser(id);
  };

  let getTextFieldData = async (e) => {
    await setEventMessage(e.target.value);
  };

  let handelPostEvent =async ()=>{
    let post ={
      userId:currentUser,
      message:eventMessage,
      dateTime: moment().toString()
    }
    if(eventMessage.length >1){
      let {data} =await postPost(post);
      setOpen(false);
      console.log(data)
    }
  
  }

  let getTime = () =>{
    // const m = moment();
    // let currentTime = m.toString();
    
    // const m2 = moment("Thu Oct 22 2020 13:57:54 GMT+0500");
    // console.log(m2.fromNow())
    // console.log(moment().toString())


  }

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        style={{
          marginTop: "20px",
          border: " 3px solid #B71C1C",
          width: "1000px",
        }}
      >
        <Grid container className={classes.mainContainer}>
          <Avatar alt="Remy Sharp" src={userImage} className={classes.large} />
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{
              marginLeft: "15px",
              marginTop: "10px",
              // width: "24.5rem",
              width: "43rem",

              height: "40px",
              borderRadius: "100px",
              boxShadow: "none",
              color: "#F0F2F5",
              outline: "none",
            }}
          >
            Whats in your mind?
          </Button>
        </Grid>
      </Card>

      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <MuiDialogTitle
          className={classes.titleContainer}
          style={{ color: "black" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Create Event</div>
            <div>
              <IconButton style={{ outline: "none" }} onClick={handleClose}>
                <CloseIcon style={{ color: "black" }} />
              </IconButton>
            </div>
          </div>
        </MuiDialogTitle>
        <MuiDialogContent
          dividers
          className={classes.textContainer}
          style={{ color: "black" }}
        >
          <TextField
            id="standard-textarea"
            label="Create Event"
            placeholder="Whats in your mind?"
            className={classes.textField}
            multiline
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            rows="9"
            onChange={getTextFieldData}
          />

          <Button
            variant="contained"
            onClick={handelPostEvent}
            style={{
              background: "#BA1D1D",
              width: "100%",
              height: "3rem",
              alignItems: "center",
              borderRadius: "100px",
              boxShadow: "none",
              color: "#F0F2F5",
              marginTop: "10px",
              outline: "none",
            }}
          >
            Post
          </Button>
        </MuiDialogContent>
      </Dialog>
    </React.Fragment>
  );
}
