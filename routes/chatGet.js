const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat")

router.post("/", async (req, res) => {
  let data = req.body;
  
  try {
    const result = await Chat.find({$or:[{$and:[{senderId:data.senderId},{receiverId:data.receiverId}]},{$and:[{senderId:data.receiverId},{receiverId:data.senderId}]}]})
    if(result)
     await res.send(result)
    else{
        res.send("No data found!")
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
    
  }
});
module.exports = router;
