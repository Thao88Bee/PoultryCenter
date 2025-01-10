const express = require("express");
const { SwapMeet, User } = require("../../db/models");

const router = express.Router();

// Get details of a Swap Meet from an id
router.get("/:swapMeetId", async (req, res, next) => {
  const id = req.params.swapMeetId;
  const swapMeet = await SwapMeet.findByPk(id, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (swapMeet) {
    res.json(swapMeet);
  } else {
    res.status(404).json({
      message: "Swap Meet couldn't be found",
    });
  }
});

// Get all Swap Meets
router.get("/", async (req, res, next) => {
  const swapMeets = await SwapMeet.findAll();

  if (swapMeets.length) {
    res.json({ Swaps: swapMeets });
  } else {
    res.status(404).json({
      message: "There are no Swap Meets at this moment.",
    });
  }
});

module.exports = router;
