const mongoose = require("mongoose");
const workSchema= new mongoose.Schema({
  userId: {
    type: String,
    
    required: true,
  },
  jobTitle: {
    type: String,
    
  },
  jobCity: {
    type: String,
    
  },
  jobDesc: {
    type: String,
    
  },
  collegeName:{
      type: String
  },
  startDate:{
      type: String
  },
  endDate:{
      type:String
  },
  degreeDesc:{
      type:String
  }
});
module.exports = Work = mongoose.model("work", workSchema, "Work");
