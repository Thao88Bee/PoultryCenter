const express = require("express");
const { Show, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateShow = [
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
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  return res.json({ Shows: shows });
});

// Create a Show
router.post("/", requireAuth, validateShow, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const { name, date, description, address, city, state, image } = req.body;

  const newShow = await Show.create({
    ownerId: userId,
    name,
    date,
    description,
    address,
    city,
    state,
    image,
  });

  return res.status(201).json(newShow);
});

// Edit a Show
router.patch("/:showId", requireAuth, validateShow, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const showId = parseInt(req.params.showId);
  const editShow = await Show.findByPk(showId);
  const { name, date, description, address, city, state, image } = req.body;

  if (!editShow) {
    return res.status(404).json({
      message: "Show couldn't be found",
    });
  }

  if (editShow.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await editShow.update({
    name,
    date,
    description,
    address,
    city,
    state,
    image,
  });
  return res.json(editShow);
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
