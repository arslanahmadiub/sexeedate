const express = require("express");
const router = express.Router();
const Package = require("../models/Packages")

router.post(
  "/",

  async (req, res) => {
    const {packageId} = req.body;
    try {
      await Package.findOneAndDelete({ _id: packageId }, function (err) {
        if (err) console.log(err);
      });
      res.send("Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;
