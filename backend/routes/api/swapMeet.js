const express = require("express");
const { SwapMeet, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

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
      message: "There are no Swap Meets at this moment",
    });
  }
});

// Delete a Swap Meet
router.delete("/:swapMeetId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const id = req.params.swapMeetId;
  const swapMeet = await SwapMeet.findByPk(id);

  if (!swapMeet) {
    res.status(404).json({
      message: "Swap Meet couldn't be found",
    });
  }

  if (swapMeet.ownerId !== userId) {
    res.status(403).json({
      message: "Forbidden",
    });
  }

  await swapMeet.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
