const mongoose = require("mongoose");
const ContactShema= new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
 
  mobile:{
      type:String,
      required: true
      
  },
  facebook:{
    type:String
},
  instagram:{
    type:String 
},
});
module.exports = Contact = mongoose.model("Contact", ContactShema, "Contact");
