const fs = require("fs");
const express = require("express");
const router = express.Router();
router.delete('/', async (req, res) => {
    try {
        fs.unlinkSync(`upload/images/${req.body.id}`);

        res.status(201).send({ message: "Image deleted" });

    } catch (e) {
        res.status(400).send({ message: "Error deleting image!", error: e.toString(), req: req.body });
    }
});

module.exports = router;