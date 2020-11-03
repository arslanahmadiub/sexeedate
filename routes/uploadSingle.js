const multer = require("multer");
const express = require("express");
const router = express.Router();
const path = require("path");
const config = require('config');
const imageUrl = config.get('imageUrl');
// Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, callBack) => {
    return callBack(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});


try {
  router.post("/", upload.single("images"), async (req, res) => {
    await res.send({
      image_url: `${imageUrl}${req.file.filename}`,
    });
  });
} catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error...");
}

module.exports = router;
