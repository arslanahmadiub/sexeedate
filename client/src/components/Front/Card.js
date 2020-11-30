import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "./Slider";

import IconButton from "@material-ui/core/IconButton";
import { deCodeId } from "../../services/userId";
import { sendFriendRequest } from "../../services/friendGet";
import { dislikeList } from "../../services/friendGet";

import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShowMoreText from "react-show-more-text";
class Card extends Component {
  state = {};

  handelFriendRequest = async (e) => {
    this.props.change(e);
    let senderId = await deCodeId();

    let data = {
      senderId: senderId,
      receiverId: this.props.id,
      friendStatus: "sent",
    };
    let result = await sendFriendRequest(data);
  };

  handelDislikeRequest = async (e) => {
    this.props.change(e);
    let senderId = await deCodeId();

    let data = {
      userId: senderId,
      friends: e,
    };
    await dislikeList(data);
  };
  render() {
    return (
      <div className="card w-100" style={{ border: "3px solid #B71C1C" }}>
        <div>
          <Slider
            id={this.props.id}
            images={this.props.images}
            video={this.props.video}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <h6 className="card-title">{this.props.age} Years </h6>

          <p
            className="card-text"
            style={{ textAlign: "justify", lineHeight: "1.2em" }}
          >
            {this.props.bio}
          </p>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton
              component="span"
              onClick={() => {
                this.handelFriendRequest(this.props.id);
              }}
            >
              <ThumbUpIcon
                style={{
                  color: "#BA1D1D",
                  width: "3rem",
                  height: "3rem",
                  padding: "0px",
                }}
              />
            </IconButton>
            <IconButton
              component="span"
              onClick={() => {
                this.handelDislikeRequest(this.props.id);
              }}
            >
              <ThumbDownIcon
                style={{
                  color: "#BA1D1D",
                  width: "3rem",
                  height: "3rem",
                  padding: "0px",
                }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
