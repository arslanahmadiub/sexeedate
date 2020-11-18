const express = require("express");

const router = express.Router();
const Packages = require("../models/Packages")



router.get("/", async (req, res) => {
   
    
    try {
      const result = await Packages.find( );
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;