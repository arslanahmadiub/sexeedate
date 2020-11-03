const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
   
    
  },
  dateTime:{
      type:String,
    
      
  }
 
});
module.exports = Post = mongoose.model("post", postSchema, "Post");
