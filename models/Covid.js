const mongoose = require("mongoose");
const CovidShema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  question1: {
    type: String,
  },
  question2: {
    type: String,
  },
  question3: {
    type: String,
  },
  question4: {
    type: String,
  },
  question5: {
    type: String,
  },
});
module.exports = Covid = mongoose.model("Covid", CovidShema, "Covid");
