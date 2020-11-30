const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Profile = require("../models/Profile");
const FriendList = require("../models/FriendList");
const FriendRequest = require("../models/FriendRequest");
const DislikeList = require("../models/DislikeList");

router.post("/", async (req, res) => {
  let id = mongoose.Types.ObjectId(req.body.userId);
  let userId = req.body.userId;
  let gender = req.body.gender;
  try {
    let dislike = await DislikeList.find({ userId: userId });

    let sentFriendRequest = await FriendRequest.find();
    const receiverId = await sentFriendRequest.map((id) => {
      if (id.receiverId === userId) {
        return id.senderId;
      } else {
        return id.receiverId;
      }
    });

    const result1 = await FriendList.aggregate([
      { $match: { userId: { $eq: userId } } },
    ]);

    if (result1.length > 0 || receiverId.length > 0 || dislike.length > 0) {
      const ids = await result1[0].friends.map((id) =>
        mongoose.Types.ObjectId(id)
      );
      const dislikeIds = await dislike[0].friends.map((id) =>
        mongoose.Types.ObjectId(id)
      );
      const result = await Profile.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $not: { $in: ["$_id", ids] } },
                { $not: { $in: ["$_id", dislikeIds] } },
                { $not: { $in: ["$_id", receiverId] } },
                { $ne: ["$_id", id] },
                { $ne: ["$gender", gender] },
              ],
            },
          },
        },

        {
          $project: {
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
            dob: 1,
          },
        },

        {
          $lookup: {
            from: "BasicInfo",

            let: { profileId: { $toString: "$_id" } },

            pipeline: [
              { $match: { $expr: { $eq: ["$userId", "$$profileId"] } } },
              {
                $project: {
                  _id: 0,
                  userImages: 1,
                  video: 1,
                  bio: 1,
                },
              },
            ],

            as: "Detail",
          },
        },
        { $unwind: "$Detail" },
      ]);
      res.send(result);
    } else {
      const result1 = await Profile.aggregate([
        {
          $match: {
            $expr: {
              $and: [{ $ne: ["$_id", id] }, { $ne: ["$gender", gender] }],
            },
          },
        },

        {
          $project: {
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
            dob: 1,
          },
        },

        {
          $lookup: {
            from: "BasicInfo",

            let: { profileId: { $toString: "$_id" } },

            pipeline: [
              { $match: { $expr: { $eq: ["$userId", "$$profileId"] } } },
              {
                $project: {
                  _id: 0,
                  userImages: 1,
                  video: 1,
                  bio: 1,
                },
              },
            ],

            as: "Detail",
          },
        },
        { $unwind: "$Detail" },
      ]);
      res.send(result1);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
