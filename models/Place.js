const mongoose = require("mongoose");
const PlaceSchema= new mongoose.Schema({
  userId: {
    type: String,
 
    required: true,
  },
 
  currentCity:{
      type:String
      
      
  },
  homeTown:{
    type:String
},

});
module.exports = Place = mongoose.model("Place", PlaceSchema, "Place");
