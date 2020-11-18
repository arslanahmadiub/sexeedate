const mongoose = require("mongoose");
const packagesSchema = new mongoose.Schema({
  packageName: {
    type: String,
   
  },
  packageDuration: {
    type: String,
   
  },
  packagePrice: {
    type: String,
    
  },
 
 
});
module.exports = Packages = mongoose.model("packages", packagesSchema, "Packages");
