const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  let userId = req.body.userId;
  var id = mongoose.Types.ObjectId(userId);

  try {
    const result = await Profile.aggregate([
      // get friend full name

      { $match: { _id: { $ne: id } } },
      { $project: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } },

      // get friend Image

      {
        $lookup: {
          from: "BasicInfo",

          let: { profileId: { $toString: "$_id" } },

          pipeline: [
            { $match: { $expr: { $eq: ["$userId", "$$profileId"] } } },

            {
              $project: {
                _id: 0,
                userImages: { $arrayElemAt: ["$userImages", 0] },
              },
            },
          ],

          as: "Image",
        },
      },
      { $unwind: "$Image" },

      // get chat

      {
        $lookup: {
          from: "Chat",

          let: { myId: { $toString: "$_id" } },

          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ["$senderId", userId] },
                        { $eq: ["$receiverId", "$$myId"] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ["$senderId", "$$myId"] },
                        { $eq: ["$receiverId", userId] },
                      ],
                    },

                  ],
                  
                },
              },
            },
            {
              $project: {
                _id: 0,
                senderId: 1,
                receiverId: 1,
                message: 1,
              },
            },
          ],

          as: "Chat",
        },
      },
    ]);
    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
