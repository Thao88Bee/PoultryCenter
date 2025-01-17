const express = require("express");
const { Review } = require("../../db/models");
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

// Edit a Review
router.patch(
  "/:reviewId",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const userId = parseInt(req.user.id);
    const reviewId = parseInt(req.params.reviewId);
    const editReview = await Review.findByPk(reviewId);
    const { review, starRating } = req.body;

    if (!editReview) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    if (editReview.ownerId !== userId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await editReview.update({
      review,
      starRating,
    });
    return res.json(editReview);
  }
);

// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const reviewId = parseInt(req.params.reviewId);
  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  if (review.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await review.destroy();
  return res.json({
    message: "Successfully delete",
  });
});

module.exports = router;
