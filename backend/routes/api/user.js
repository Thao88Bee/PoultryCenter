const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Show, SwapMeet, Post, Review, sequelize } = require("../../db/models");

const router = express.Router();

// Get all Reviews of the Current User
router.get("/reviews", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userReviews = await Review.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "ownerId", "name", "description"],
      },
    ],
  });

  if (userReviews.length) {
    res.json({ Reviews: userReviews });
  } else {
    res.status(404).json({
      message: "User do not have any Reviews.",
    });
  }
});

// Get all Posts owned by the Current User
router.get("/posts", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userPosts = await Post.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("Reviews.starRating")),
            1
          ),
          "avgRating",
        ],
      ],
    },
    group: ["Post.id"],
  });

  if (userPosts.length) {
    res.json({ Posts: userPosts });
  } else {
    res.status(404).json({
      message: "User do not have any Posts.",
    });
  }
});

// Get all Swap Meets owned by the Current User
router.get("/swapMeets", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userSwapMeets = await SwapMeet.findAll({
    where: {
      ownerId: userId,
    },
  });

  if (userSwapMeets.length) {
    res.json({ Swaps: userSwapMeets });
  } else {
    res.status(404).json({
      message: "User do not have any Swap Meets.",
    });
  }
});

// Get all Shows owned by the Current User
router.get("/shows", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userShows = await Show.findAll({
    where: {
      ownerId: userId,
    },
  });

  if (userShows.length) {
    res.json({ Shows: userShows });
  } else {
    res.status(404).json({
      message: "User do not have any Shows.",
    });
  }
});

module.exports = router;
