const mongoose = require("mongoose");
const friendRequestSchema = new mongoose.Schema({
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  friendStatus: {
    type: String,
  },
});
module.exports = FriendRequest = mongoose.model("friendRequest", friendRequestSchema, "FriendRequest");
