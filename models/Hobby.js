const mongoose = require("mongoose");
const hobbySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  hobbies: {
    type: Array,
    
  }
    
  
});
module.exports = Hobby = mongoose.model("hobby", hobbySchema, "Hobby");
