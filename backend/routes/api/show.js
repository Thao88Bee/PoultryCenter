const express = require("express");
const { Show, User } = require("../../db/models");

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
      message: "Show couldn't be found.",
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
      message: "There are no Shows at this moment.",
    });
  }
});

module.exports = router;
