const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Show, SwapMeet, Post, Review } = require("../../db/models");

const router = express.Router();

// Get all Reviews of the Current User
router.get("/:userId/reviews", requireAuth, async (req, res, next) => {
  const id = req.params.userId;
  const userReviews = await Review.findAll({
    where: {
      ownerId: id,
    }
  })

  if (userReviews.length) {
    res.json({ Reviews: userReviews })
  } else {
    res.status(404).json({
      message: "User do not have any Reviews."
    })
  }
})

// Get all Posts owned by the Current User
router.get("/:userId/posts", requireAuth, async (req,res,next) => {
  const id = req.params.userId;
  const userPosts = await Post.findAll({
    where: {
      ownerId: id,
    }
  })

  if (userPosts.length) {
    res.json({ Posts: userPosts })
  } else {
    res.status(404).json({
      message: "User do not have any Posts."
    })
  }
})

// Get all Swap Meets owned by the Current User
router.get("/:userId/swapMeets", requireAuth, async (req, res, next) => {
  const id = req.params.userId;
  const userSwapMeets = await SwapMeet.findAll({
    where: {
      ownerId: id,
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
router.get("/:userId/shows", requireAuth, async (req, res, next) => {
  const id = req.params.userId;
  const userShows = await Show.findAll({
    where: {
      ownerId: id,
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
