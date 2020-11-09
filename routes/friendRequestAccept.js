const express = require("express");

const router = express.Router();
const FriendRequest = require("../models/FriendRequest");

router.post("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await FriendRequest.aggregate([
      { $match: { receiverId: { $eq: userId } } },

      {
        $lookup: {
          from: "BasicInfo",

          let: { profileId: { $toString: "$senderId" } },

          pipeline: [
            { $match: { $expr: { $eq: ["$userId", "$$profileId"] } } },

            {
              $project: {
                _id: 0,
                video: 1,
                bio: 1,
                userImages: 1,
                userId:1
              },
            },
          ],

          as: "Detail",
        },
      },
      { $unwind: "$Detail" },
      {
        $lookup: {
          from: "Profile",

          let: { profileId: { $toObjectId: "$senderId" } },

          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$profileId"] } } },

            {
              $project: {
                _id: 0,
                fullName: { $concat: ["$firstName", " ", "$lastName"] },
                dob:1
              },
            },
          ],

          as: "Name",
        },
      },
      { $unwind: "$Name" },
    ]);

    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
