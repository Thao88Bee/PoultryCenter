const express = require("express");
const { Post } = require("../../db/models");

const router = express.Router();

// Get all Posts
router.get("/", async (req, res, next) => {
  const posts = await Post.findAll();

  if (posts.length) {
    res.json({ Posts: posts });
  } else {
    res.status(404).json({
      message: "There are no Posts at this moment.",
    });
  }
});

module.exports = router;
