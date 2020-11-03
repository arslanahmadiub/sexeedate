const express = require("express");

const router = express.Router();
const Hobby = require("../models/Hobby");


router.post("/", async (req, res) => {
    let data = req.body;
    
    try {
      const result = await Hobby.findOne( {userId:data.userId});
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;