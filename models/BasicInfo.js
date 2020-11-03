const mongoose = require("mongoose");
const basicInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    
    required:true
  },
  languages: {
    type: Array,
    
  },
  pasport:{
      type:Object,
      
  },
  video:{
      type:Object,
      
  },
  bio:{
      type:String,
      
  },
  userImages:{
    type:Array,
  
},
});
module.exports = basicInfo = mongoose.model("basicInfo", basicInfoSchema, "BasicInfo");
