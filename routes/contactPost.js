const express = require("express");

const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const { userId, mobile, facebook, instagram } = req.body;
  try {
    let contact = new Contact({
      userId: userId,
      mobile: mobile,
      facebook: facebook,
      instagram:instagram
    });

    await contact.save();
    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
