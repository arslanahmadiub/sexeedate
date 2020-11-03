const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true
    
  },
  message:{
      type:String,
      required: true
      
  }
 
});
module.exports = Chat = mongoose.model("chat", chatSchema, "Chat");
