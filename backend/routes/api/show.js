const express = require("express");
const { Show } = require("../../db/models");

const router = express.Router();

// Get all Shows
router.get("/", async (req, res, next) => {
  const shows = await Show.findAll();

  if (shows.length) {
    res.json({ Shows: shows });
  } else {
    res.status(404).json({
      message: "There are no Shows at this moment.",
    });
  }
});

module.exports = router;
