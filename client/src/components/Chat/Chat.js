import React, { Component } from "react";
import io from "socket.io-client";

import Avatar from "@material-ui/core/Avatar";
import modelImage from "../../images/mod2.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getFriendWithChat } from "../../services/chat";
import { deCodeId } from "../../services/userId";
import { animateScroll } from "react-scroll";
import {chatPost} from '../../services/chat'
import { userImageGet } from "../../services/friendGet";

import IconButton from "@material-ui/core/IconButton";
import "./chat.css";

const socketUrl ="http://157.230.228.67:5000";

class Chat extends Component {
  state = { 
    curTime: new Date().toLocaleString(),
    endPoint: "http://157.230.228.67:5000",
    chatMember: [],
    chatText: "",
    chat: [],
    currentUser: "",
    chatData: [],
    friendImage: "",
    friendName: "",
    receiverId:"",
    socket: "null",
    userAvatar:""
  };

 async componentDidMount() {
    await this.getCurrentUser();

    await this.fetchChataData();
    await this.fetchCurrentImage();
    await this.getMessage();
  }

fetchCurrentImage = async () => {
    let id = await deCodeId();
    let userId = { userId: id };
    let { data } = await userImageGet(userId);

    if (data.length > 0) {
      let image = data[0].User.userImages[0];
await this.setState({userAvatar:image.imageUrl})
     
    }
  };
  getMessage = () => {
    let socket = io(this.state.endPoint);
    
    socket.on("res", (data) => {
      if (data.senderId === this.state.receiverId  && data.receiverId === this.state.currentUser) {
      
        
        let message = [...this.state.chat];
        message.push(data);
        this.setState({ chat: message });
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

  getCurrentUser = async () => {
    let id = await deCodeId();
    await this.setState({ currentUser: id });
  };

  
  fetchChataData = async () => {
    let id = await deCodeId();
    let userId = { userId: id };

    let { data } = await getFriendWithChat(userId);

    let friendArray = [];

    let chatArray = [];
   
      for (let i = 0; i < data.length; i++) {
        if(data[i].Chat.length>0){
          let friend = {
            name: data[i].fullName,
            avatar: data[i].Image.userImages.imageUrl,
            lastMessage: data[i].Chat[data[i].Chat.length - 1].message,
            id: data[i]._id,
          };
          friendArray.push(friend);
    
          let chatObject = {
            id: data[i]._id,
            chat: data[i].Chat,
            avatar: data[i].Image.userImages.imageUrl,
            name: data[i].fullName,
          };
          chatArray.push(chatObject);
        }
        else{
          let friend = {
            name: data[i].fullName,
            avatar: data[i].Image.userImages.imageUrl,
            lastMessage: "",
            id: data[i]._id,
          };
          friendArray.push(friend);
        }
     
      }
      this.setState({ chatMember: friendArray, chatData: chatArray });
    
    
  };

  onEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(this.state.chat)
      let message = this.state.chatText;
      let chatObject = {
        senderId: this.state.currentUser,
        receiverId: this.state.receiverId,
        message: message,
      
      };
      this.newMessage(chatObject)
      let chat = [...this.state.chat];
      await chat.push(chatObject);
      await this.setState({ chat: chat });
      await chatPost(chatObject)
      await this.setState({ chatText: "" });
      this.scrollToBottom()
    }
  };

  handleChat = (e) => {
    this.setState({ chatText: e.target.value });
  };

  handelTimeline = () => {
    const {
      history: { push },
    } = this.props;

    push("/timeline");
  };
  handelMessenger = () => {
    const {
      history: { push },
    } = this.props;

    push("/chat");
  };
  handelFavrot = () => {
    const {
      history: { push },
    } = this.props;

    push("/home");
  };
  handelLogout = () => {
    const {
      history: { push },
    } = this.props;

    push("/");
  };

  handelChatClick = async (e) => {
    this.fetchChataData();
    
    let { chatData } = this.state;
    let id = e.id;
   
    await this.setState({receiverId:id})
    let filterObject = chatData.filter((item) => item.id == id);
    if(filterObject.length>0){
      await this.setState({
        chat: filterObject[0].chat,
        friendImage: filterObject[0].avatar,
        friendName: filterObject[0].name,
      });
    }
    else{
    let newFilter = this.state.chatMember.filter((item) => item.id == id);
     
      await this.setState({
        
        friendImage: newFilter[0].avatar,
        friendName: newFilter[0].name,
      });
    }
  
    await this.scrollToBottom();
  };

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "content",
    });
  }

  render() {
    const {
      chatMember,
      chat,
      currentUser,
      friendImage,
      friendName,
      userAvatar,
      receiverId
    } = this.state;

    return (
      <main style={{ overflow: "auto" }}>
        <div className="layout">
          <div
            className="sidebar"
            id="sidebar"
            style={{ background: "#100C08", color: "white" }}
          >
            <div className="container">
              <div className="col-md-12">
                <div className="tab-content">
                  <div id="discussions" className="tab-pane fade active show">
                    <div className="search">
                      <form
                        className="form-inline position-relative"
                        id="searchConv"
                      >
                        <input
                          type="search"
                          className="form-control"
                          id="conversations"
                          placeholder="Search for conversations..."
                        />
                        <button type="button" className="btn btn-link loop">
                          <i className="material-icons">search</i>
                        </button>
                      </form>
                    </div>

                    <div className="discussions">
                      <h1>Discussions</h1>
                      <div className="list-group" id="chats" role="tablist">
                        {chatMember.map((item, index) => {
                          return (
                            <a
                              href="#"
                              className=" all read single "
                              data-toggle="list"
                              role="tab"
                              onClick={() => {
                                this.handelChatClick(item);
                              }}
                            >
                              <img
                                className="avatar-md"
                                src={item.avatar}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Janette"
                                alt="avatar"
                              />
                              {/* <div className="status">
                                <i className={`material-icons ${item.status}`}>
                                  fiber_manual_record
                                </i>
                              </div> */}

                              <div className="data">
                                <h5
                                  style={{
                                    background: "#100C08",
                                    color: "white",
                                  }}
                                >
                                  {item.name}
                                </h5>
                                <span>{item.day}</span>
                                <p>{item.lastMessage}</p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="babble tab-pane fade active show"
                id="list-chat"
                role="tabpanel"
                aria-labelledby="list-chat-list"
              >
                <div
                  className="chat"
                  id="chat1"
                  style={{
                    background: "#100C08",
                    color: "white",
                    border: "2px solid #100C08",
                  }}
                >
                  <div
                    className="top"
                    style={{ background: "#100C08", color: "white" }}
                  >
                    <div className="container">
                      {/* top of container */}
                      <div className="col-md-12">
                        <div className="inside">
                          {friendName.length > 0 ? (
                            <React.Fragment>
                              <a href="#">
                                <img
                                  className="avatar-md"
                                  src={friendImage}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Keith"
                                  alt="avatar"
                                />
                              </a>
                              <div className="status">
                                <i className="material-icons online">
                                  fiber_manual_record
                                </i>
                              </div>
                              <div className="data" id="activeUser">
                                <h5>
                                  <a href="#">{friendName}</a>
                                </h5>
                                <span>Active now</span>
                              </div>
                            </React.Fragment>
                          ) : null}

                          <div>
                            <IconButton onClick={this.handelTimeline}>
                              <Avatar
                                alt="Remy Sharp"
                                src={userAvatar}
                                style={{
                                  width: "35px",
                                  height: "35px",
                                }}
                              />
                            </IconButton>

                            <IconButton onClick={this.handelFavrot}>
                              <FavoriteIcon
                                style={{
                                  color: "#B71C1C",
                                }}
                              />
                            </IconButton>
                            <IconButton onClick={this.handelLogout}>
                              <ExitToAppIcon
                                style={{
                                  color: "#B71C1C",
                                }}
                              />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* chat view section */}

                  <div className="content" id="content">
                    <div className="container">
                      <div className="col-md-12">
                        <div className="date"></div>

                        {chat.map((item, index) => {
                          return (
                            <div
                              className={
                                item.senderId == currentUser
                                  ? "message me"
                                  : "message"
                              }
                            >
                              {item.senderId !== currentUser ? (
                                <img
                                  className="avatar-md"
                                  src={friendImage}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Keith"
                                  alt="avatar"
                                />
                              ) : null}

                              <div className="text-main">
                                <div className="text-group me">
                                  <div className="text me">
                                    <p>{item.message}</p>
                                  </div>
                                </div>
                                <span>{item.time}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* chat typing section */}

                  <div
                    className="container"
                    style={{ background: "#100C08", color: "white" }}
                  >
                    <div className="col-md-12">
                      <div className="bottom">
                        <form className="position-relative w-100">
                          <textarea
                            className="form-control"
                            placeholder="Start typing for reply..."
                            disabled={receiverId.length>0 ? false :true}
                            value={this.state.chatText}
                            onChange={this.handleChat}
                            onKeyDown={this.onEnterKeyPress}
                            rows="1"
                            id="chatText"
                          />
                          <button className="btn emoticons">
                            <i className="material-icons">insert_emoticon</i>
                          </button>
                          <button
                            type="submit"
                            className="btn send"
                            id="sendButton"
                          >
                            <i className="material-icons">send</i>
                          </button>
                        </form>
                        <label>
                          <input type="file" />
                          <span
                            className="btn attach d-sm-block d-none"
                            style={{ background: "#B71C1C" }}
                          >
                            <i className="material-icons">attach_file</i>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Chat;
