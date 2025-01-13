const express = require("express");
const { ShowWatchList } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Delete a Show Watchlist
router.delete("/:showWatchListId", requireAuth, async (req, res, next) => {
    const userId = parseInt(req.user.id)
    const id = req.params.showWatchListId
    const showWatchList = await ShowWatchList.findByPk(id)

    if (!showWatchList) {
        res.status(404).json({
            message: "Show Watchlist couldn't be found"
        })
    }

    if (showWatchList.ownerId !== userId) {
        res.status(403).json({
            message: "Forbidden"
        })
    }

    await showWatchList.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
