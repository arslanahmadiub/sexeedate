import React, { Component } from "react";
import io from "socket.io-client";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import {deCodeId} from '../../services/userId'
import { animateScroll } from "react-scroll";
import {chatPost} from '../../services/chat'
import {chatGet} from '../../services/chat'
import {readLastMessage} from '../../services/chat'
import "./Timeline.css";



// const socketUrl ="http://67.207.95.173:5000";
const socketUrl ="http://157.230.228.67:5000";

class Chatbox extends Component {
  state = {
    endPoint: "http://157.230.228.67:5000",
    chatShow: this.props.show,
    friendName: this.props.name,
    friendId: this.props.id,
    friendImage: this.props.image,
    name: "",
    room: "1",
    messageList: [],

    inputMessage: "",
    currentUser: "",

    socket: "null",
  };

  async componentDidMount() {
    this.getCurrentUser();

    this.getMessage();
    
  }

  getMessage = () => {
    let socket = io(this.state.endPoint);
    socket.on("res", (data) => {
  
      if (data.senderId === this.state.friendId  && data.receiverId === this.state.currentUser) {
        let message = [...this.state.messageList];
        message.push(data);
        this.setState({ messageList: message });
      console.log(this.state.messageList[this.state.messageList.length-1])

      }
      if(!this.state.chatShow){
          
          this.props.update()
      }

      this.scrollToBottom();

    });
  };

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {});
    this.setState(socket);
  };

  newMessage = (messageObject) => {
    const socket = io(socketUrl);

    socket.emit("newMessage", messageObject, () => {});

    this.setState(socket);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      chatShow: nextProps.show,
      friendName: nextProps.name,
      friendId: nextProps.id,
      friendImage: nextProps.image,
    });
  }

  getCurrentUser = async () => {
    let id = await deCodeId();
    await this.setState({ currentUser: id });
  };
  handelShow = async() => {
    await this.props.close();
    await this.fetchMessages();
    console.log(this.state.messageList)
  };

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "body",
    });
  }

  fetchMessages = async () => {
    let getDataObject = {
      senderId: this.state.currentUser,
      receiverId: this.state.friendId,
    };
    let { data } = await chatGet(getDataObject);
    console.log(data)
    this.setState({ messageList: data });
    this.scrollToBottom()
    console.log(this.state.messageList[this.state.messageList.length-1])
  };

  handelMessage = async (e) => {
    await this.setState({ inputMessage: e.target.value });
  };
  
  handelMessageClick = async (e) => {
    if (e.key === "Enter") {
      let messageObject = {
        senderId: this.state.currentUser,
        receiverId: this.state.friendId,
        message: this.state.inputMessage,
      };

      let readObject={
        senderId: this.state.friendId,
        receiverId: this.state.currentUser,
      }
      
      readLastMessage(readObject)

      let messageLists = [...this.state.messageList];
      messageLists.push(messageObject);

      this.setState({ messageList: messageLists });
      // let { name, inputMessage, messageList } = this.state;
      // let socket = io(this.state.endPoint);

      // socket.emit("message", { name, message: inputMessage }, () => {});
      this.setState({ inputMessage: "" });
      this.scrollToBottom();
      this.newMessage(messageObject);
      const { data } = await chatPost(messageObject);
      this.props.update()

      
    }
  };

  render() {
    let {
      chatShow,
      friendName,
      friendId,
      friendImage,
      messageList,
      inputMessage,
      currentUser,
    } = this.state;
    return (
      <div
        className={chatShow ? "con" : "closs"}
        style={{ overflow: "hidden" }}
      >
        <div
          id="head"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
     
          <Avatar
            alt="Remy Sharp"
            src={friendImage}
            style={{ marginLeft: "5px" }}
          />

          <h5 style={{ marginTop: "2%", marginLeft: "5%", color: "white" }}>
            {friendName}
          </h5>
          <IconButton
            style={{ outline: "none", marginLeft: "auto" }}
            onClick={this.handelShow}
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div id="body">
    

          {messageList.map((item, index) => {
            return (
              <div
                id={item.senderId == currentUser ? "user2" : "user1"}
                key={index}
              >
                {item.message}
              </div>
            );
          })}
        </div>
        <div id="btm">
          <input
            type="text"
            id="text"
            name="inputMessage"
            placeholder="Enter your Message..."
            autoComplete="off"
            value={inputMessage}
            onChange={this.handelMessage}
            onKeyDown={this.handelMessageClick}
          />
        </div>
      </div>
    );
  }
}

export default Chatbox;
