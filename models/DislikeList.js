const mongoose = require("mongoose");
const dislikeListSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  friends: {
    type: Array,
  },
});
module.exports = DislikeList = mongoose.model(
  "dislikeList",
  dislikeListSchema,
  "DislikeList"
);
