const express = require("express");
const { Post, User, Review } = require("../../db/models");

const router = express.Router();

// Get all Reviews by a Post's id
router.get("/:postId/reviews", async (req, res, next) => {
  const id = req.params.postId;
  const post = await Post.findByPk(id);
  if (post) {
    const postReviews = await Review.findAll({
      where: {
        postId: id,
      },
      include: [
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (postReviews.length) {
      res.json({ Reviews: postReviews });
    } else {
      res.status(404).json({
        message: "Post has no review.",
      });
    }
  } else {
    res.status(404).json({
      message: "Post couldn't be found.",
    });
  }
});

// Get details of a Post from an id
router.get("/:postId", async (req, res, next) => {
  const id = req.params.postId;
  const post = await Post.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({
      message: "Post couldn't be found.",
    });
  }
});

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
