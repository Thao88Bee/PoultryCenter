const express = require("express");
const { Post, User, Review, sequelize } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateReview = [
  check("review").notEmpty().withMessage("Review text is required"),
  check("starRating")
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// Get all Reviews by a Post's id
router.get("/:postId/reviews", async (req, res, next) => {
  const id = parseInt(req.params.postId);
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
        message: "Post has no review",
      });
    }
  } else {
    res.status(404).json({
      message: "Post couldn't be found",
    });
  }
});

// Get details of a Post from an id
router.get("/:postId", async (req, res, next) => {
  const id = parseInt(req.params.postId);
  const post = await Post.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Review,
      },
    ],
  });

  if (post) {
    const reviews = await Review.findAll({
      where: {
        postId: id,
      },
      attributes: ["starRating"],
    });

    const numReviews = reviews.length;
    const avgStarRating =
      numReviews > 0
        ? parseFloat(
            (
              reviews.reduce((sum, review) => sum + review.starRating, 0) /
              numReviews
            ).toFixed(1)
          )
        : null;

    const newPost = post.toJSON();
    newPost.numReviews = numReviews;
    newPost.avgRating = avgStarRating;

    res.json(newPost);
  } else {
    res.status(404).json({
      message: "Post couldn't be found",
    });
  }
});

// Get all Posts
router.get("/", async (req, res, next) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
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
    group: ["Post.id", "Owner.id"],
  });

  if (posts.length) {
    res.json({ Posts: posts });
  } else {
    res.status(404).json({
      message: "There are no Posts at this moment",
    });
  }
});

// Create a Review for a Post based on the Post's id
router.post(
  "/:postId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const userId = parseInt(req.user.id);
    const postId = parseInt(req.params.postId);
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post couldn't be found",
      });
    } else {
      const { review, starRating } = req.body;
      const newReview = await Review.create({
        ownerId: userId,
        postId,
        review,
        starRating,
      });
      res.json(newReview);
    }
  }
);

// Delete a Spot
router.delete("/:postId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.postId);
  const post = await Post.findByPk(postId);

  if (!post) {
    res.status(404).json({
      message: "Post couldn't be found",
    });
  }

  if (post.ownerId !== userId) {
    res.status(403).json({
      message: "Forbidden",
    });
  }

  await post.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
