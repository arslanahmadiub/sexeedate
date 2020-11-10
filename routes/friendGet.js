const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const FriendList = require("../models/FriendList");
const BasicInfo = require("../models/BasicInfo");

router.post("/", async (req, res) => {
  let { userId } = req.body;
  try {
    const result = await FriendList.aggregate([
      { $match: { userId: { $eq: userId } } },
    ]);
if(result.length>0){
  let final = await BasicInfo.aggregate([
    {
      $match: {
        $expr: {
          $in: ["$userId", result[0].friends],
        },
      },
    },
    {
      $project: {
        userImages: { $arrayElemAt: ["$userImages", 0] },
        userId: 1,
      },
    },
    {
      $lookup: {
        from: "Profile",

        let: { profileId: { $toObjectId: "$userId" } },

        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$profileId"] } } },
          {
            $project: {
              _id: 0,
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
            },
          },
        ],

        as: "Detail",
      },
    },
    { $unwind: "$Detail" },
  ]);
  res.send(final);

}
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
