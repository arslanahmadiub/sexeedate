import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";

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

export default function Eventcard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        style={{
          marginTop: "10px",
          width: "5000px",
          border: " 3px solid #B71C1C",
        }}
      >
        <Grid container className={classes.mainContainer}>
          <Avatar alt="Remy Sharp" src={props.image} />
          <div>
            <h6 style={{ marginLeft: "10px", color: "black" }}>{props.name}</h6>

            <h6
              style={{
                marginLeft: "10px",
                color: "black",
                fontSize: ".8rem",
                marginTop: "-5px",
              }}
            >
              {props.time}
            </h6>
          </div>
        </Grid>
        <Grid container className={classes.mainContainer}>
          <h4 style={{ color: "black" }}>{props.message}</h4>
        </Grid>
        <Grid container className={classes.mainContainer}>
          <div
            style={{
              display: "flex",
              width: "100vw",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton style={{ outline: "none" }} onClick={handleClose}>
                <FavoriteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
            <div>
              <IconButton style={{ outline: "none" }} onClick={handleClose}>
                <MessageIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
