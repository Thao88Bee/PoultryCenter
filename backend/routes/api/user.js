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

  return res.json({ Reviews: userReviews });
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

  return res.json({ Posts: userPosts });
});

// Get all Swap Meets owned by the Current User
router.get("/swapMeets", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userSwapMeets = await SwapMeet.findAll({
    where: {
      ownerId: userId,
    },
  });

  return res.json({ Swaps: userSwapMeets });
});

// Get all Shows owned by the Current User
router.get("/shows", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const userShows = await Show.findAll({
    where: {
      ownerId: userId,
    },
  });

  return res.json({ Shows: userShows });
});

module.exports = router;
