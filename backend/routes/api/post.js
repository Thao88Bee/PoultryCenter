const express = require("express");
const { Post, User, Review, sequelize } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validatePost = [
  check("name")
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters"),
  check("description").notEmpty().withMessage("Description is required"),
  handleValidationErrors,
];

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
      return res.json({ Reviews: postReviews });
    } else {
      return res.status(404).json({
        message: "Post has no review",
      });
    }
  } else {
    return res.status(404).json({
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

    return res.json(newPost);
  } else {
    return res.status(404).json({
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
    return res.json({ Posts: posts });
  } else {
    return res.status(404).json({
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
      return res.status(404).json({
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
      return res.status(201).json(newReview);
    }
  }
);

// Create a Post
router.post("/", requireAuth, validatePost, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const { name, description } = req.body;

  const newPost = await Post.create({
    ownerId: userId,
    name,
    description,
  });

  return res.status(201).json(newPost);
});

// Edit a Post
router.patch("/:postId", requireAuth, validatePost, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.postId);
  const editPost = await Post.findByPk(postId);
  const { name, description } = req.body;

  if (!editPost) {
    return res.status(404).json({
      message: "Post couldn't be found",
    });
  }

  if (editPost.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await editPost.update({
    name,
    description,
  });
  return res.json(editPost);
});

// Delete a Spot
router.delete("/:postId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.postId);
  const post = await Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post couldn't be found",
    });
  }

  if (post.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await post.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
