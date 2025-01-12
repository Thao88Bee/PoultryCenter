const express = require("express");
const { SwapMeetWatchList } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

module.exports = router;
