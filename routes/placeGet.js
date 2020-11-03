const express = require("express");

const router = express.Router();
const Place = require("../models/Place");


router.post("/", async (req, res) => {
    let data = req.body;
    
    try {
      const result = await Place.findOne( {userId:data.userId});
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;