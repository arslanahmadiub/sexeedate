const mongoose = require("mongoose");
const friendListSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  friends: {
    type: Array,
  },
 
});
module.exports = FriendList = mongoose.model("friendList", friendListSchema, "FriendList");
