const express = require("express");
const { SwapMeet, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSwapMeet = [
  check("name")
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("date")
    .isAfter(new Date().toISOString().split("T")[0])
    .withMessage("Date cannot be in the past"),
  check("description").notEmpty().withMessage("Description is required"),
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  handleValidationErrors,
];

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

// Create a Swap Meet
router.post("/", requireAuth, validateSwapMeet, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const { name, date, description, address, city, state, image } = req.body;

  const newSwapMeet = await SwapMeet.create({
    ownerId: userId,
    name,
    date,
    description,
    address,
    city,
    state,
    image,
  });

  return res.status(201).json(newSwapMeet);
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
