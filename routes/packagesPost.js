const express = require("express");

const router = express.Router();
const Packages = require("../models/Packages")

router.post("/", async (req, res) => {
  const { packageName, packageDuration , packagePrice } = req.body;
  try {
    let package = new Packages({
        packageName,
        packageDuration,
        packagePrice
    });
    await package.save();
    res.send(package);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
