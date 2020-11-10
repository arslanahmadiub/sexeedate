const express = require("express");

const router = express.Router();
const FriendList = require("../models/FriendList");

router.post("/", async (req, res) => {
  const { userId, friends } = req.body;
  try {
    let friendList = new FriendList({
      userId,
      friends,
    });
    let secondFriendList = new FriendList({
      userId:friends,
      friends:userId
    });



    let user = await FriendList.find({ userId: userId });
    let secondUser = await FriendList.find({ userId: friends });

    if (user.length < 1) {
      await friendList.save();
      
    }
    if (secondUser.length < 1) {
      await secondFriendList.save();
      
    }
    if(user.length>0){

      let result = await FriendList.updateOne(
        { userId: req.body.userId },
        { $push: { friends: req.body.friends } }
      );
    
    }
    if(secondUser.length>0){

      let secondResult = await FriendList.updateOne(
        { userId: req.body.friends },
        { $push: { friends: req.body.userId } }
      );
      
    
    }
    

    res.send("Success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
