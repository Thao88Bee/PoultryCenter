const express = require("express");
const { ShowWatchList } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

module.exports = router;
