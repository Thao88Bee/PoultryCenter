const express = require("express");
const { SwapMeet, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Get details of a Swap Meet from an id
router.get("/:swapMeetId", async (req, res, next) => {
  const swapMeetId = parseInt(req.params.swapMeetId);
  const swapMeet = await SwapMeet.findByPk(swapMeetId, {
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (swapMeet) {
    return res.json(swapMeet);
  } else {
    return res.status(404).json({
      message: "Swap Meet couldn't be found",
    });
  }
});

// Get all Swap Meets
router.get("/", async (req, res, next) => {
  const swapMeets = await SwapMeet.findAll({
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName", "email"]
      }
    ]
  });

  if (swapMeets.length) {
    return res.json({ Swaps: swapMeets });
  } else {
    return res.status(404).json({
      message: "There are no Swap Meets at this moment",
    });
  }
});

// Delete a Swap Meet
router.delete("/:swapMeetId", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const swapMeetId = parseInt(req.params.swapMeetId);
  const swapMeet = await SwapMeet.findByPk(swapMeetId);

  if (!swapMeet) {
    return res.status(404).json({
      message: "Swap Meet couldn't be found",
    });
  }

  if (swapMeet.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await swapMeet.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
