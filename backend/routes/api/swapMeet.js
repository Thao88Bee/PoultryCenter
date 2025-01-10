const express = require("express");
const { SwapMeet } = require("../../db/models");

const router = express.Router();

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
