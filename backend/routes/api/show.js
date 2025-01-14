const express = require("express");
const { Show, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Get details of a Show from an id
router.get("/:showId", async (req, res, next) => {
  const showId = parseInt(req.params.showId);
  const show = await Show.findByPk(showId, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (show) {
    return res.json(show);
  } else {
    return res.status(404).json({
      message: "Show couldn't be found",
    });
  }
});

// Get all Shows
router.get("/", async (req, res, next) => {
  const shows = await Show.findAll({
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"]
      }
    ]
  });

  if (shows.length) {
    return res.json({ Shows: shows });
  } else {
    return res.status(404).json({
      message: "There are no Shows at this moment",
    });
  }
});

// Delete a Show
router.delete("/:showId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const showId = parseInt(req.params.showId);
  const show = await Show.findByPk(showId);

  if (!show) {
    return res.status(404).json({
      message: "Show couldn't be found",
    });
  }

  if (show.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await show.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
