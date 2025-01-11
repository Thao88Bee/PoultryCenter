const express = require("express");
const { Show, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Get details of a Show from an id
router.get("/:showId", async (req, res, next) => {
  const id = req.params.showId;
  const show = await Show.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (show) {
    res.json(show);
  } else {
    res.status(404).json({
      message: "Show couldn't be found",
    });
  }
});

// Get all Shows
router.get("/", async (req, res, next) => {
  const shows = await Show.findAll();

  if (shows.length) {
    res.json({ Shows: shows });
  } else {
    res.status(404).json({
      message: "There are no Shows at this moment",
    });
  }
});

// Delete a Show
router.delete("/:showId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const id = req.params.showId;
  const show = await Show.findByPk(id);

  if (!show) {
    res.status(404).json({
      message: "Show couldn't be found",
    });
  }

  if (show.ownerId !== userId) {
    res.status(403).json({
      message: "Forbidden",
    });
  }

  await show.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
