const express = require("express");
const { Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const id = req.params.reviewId;
  const review = await Review.findByPk(id);

console.log(userId);
console.log(review);

  if (!review) {
    res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  if (review.ownerId !== userId) {
    res.status(403).json({
      message: "Forbidden",
    });
  }

  await review.destroy();
  res.json({
    message: "Successfully delete",
  });
});

module.exports = router;
