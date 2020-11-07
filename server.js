const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");


const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
const server = http.createServer(app);
const io=module.exports.io = socketio(server);

// Connect Database

connectDB();

app.use(express.json({ extended: false }));


// app.get("/", (req, res) => res.send("Api Running"));

//Routes for Prize

io.on("connect", (socket) => {
    socket.on("newMessage", ({senderId, receiverId,message})=>{
      
      io.emit('res', {senderId, receiverId,message})
    })

});
// io.on("connect", SocketManager);


app.use("/images", express.static("upload/images"))
app.use("/profile", require("./routes/profilePost"));
app.use("/profileGet", require("./routes/profileGet"));
app.use("/auth", require("./routes/auth"));
app.use("/confirm", require("./routes/confirmEmail"));
app.use("/singleUpload", require("./routes/uploadSingle"));
app.use("/multiUpload", require("./routes/multiUpload"));
app.use("/bacicInfo", require("./routes/basicInfoPost"));
app.use("/basicInfoGet", require("./routes/basicInfoGet"));
app.use("/contactPost", require("./routes/contactPost"));
app.use("/contactGet", require("./routes/contactGet"));
app.use("/placePost", require("./routes/placePost"));
app.use("/placeGet", require("./routes/placeGet"));
app.use("/workPost", require("./routes/workPost"));
app.use("/workGet", require("./routes/workGet"));
app.use("/hobbyPost", require("./routes/hobbyPost"));
app.use("/hobbyGet", require("./routes/hobbyGet"));
app.use("/covidPost", require("./routes/covidPost"));
app.use("/covidGet", require("./routes/covidGet"));
app.use("/friendGet", require("./routes/friendGet"));
app.use("/chatPost", require("./routes/chatPost"));
app.use("/chatGet", require("./routes/chatGet"));
app.use("/postPost", require("./routes/postPost"));
app.use("/postGet", require("./routes/postGet"));
app.use("/matchGet", require("./routes/getMatching"));
app.use("/allPostGet", require("./routes/allPostGet"));
app.use("/allProfileGet", require("./routes/userDetailGet"));
app.use("/updateProfileStatus", require("./routes/updateProfileStatus"));
app.use("/imageDelete", require("./routes/imageDel"));
app.use("/limitedChat", require("./routes/getLastChat"));

app.use("/postDelete", require("./routes/postDel"));
app.use("/profileDelete", require("./routes/profileDel"));
app.use("/getUserRole", require("./routes/getUserDetial"));
app.use("/getCurrentUser", require("./routes/currentUserGet"));
app.use("/getFriendChat", require("./routes/getFriendChat"));
app.use("/getUserGender", require("./routes/getUserGender"));
app.use("/getFullUserDetail", require("./routes/getFullUserDetail"));
app.use("/getUserImage", require("./routes/getUserImage"));
app.use("/forgetPass", require("./routes/forgotPass"));
app.use("/updatePass", require("./routes/updatePassword"));
app.use("/sendFriendRequest", require("./routes/friendRequest"));

app.get("/confirm", require("./routes/confirmEmail"));

server.listen(port, () => console.log(`Server has started at port ${port}`));




