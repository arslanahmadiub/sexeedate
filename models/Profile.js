const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
    
  },
  role: {
    type: String,
    
    default:"User"
    
  },
  active: {
    type: Boolean,
    default:false
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"Partial"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  subStatus:{
    type: String,
    default:"Free"
  },
  subOverDate:{
    type: String,
   
  }
});
module.exports = Profile = mongoose.model("profile", profileSchema, "Profile");
