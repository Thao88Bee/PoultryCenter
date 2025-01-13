const express = require("express");
const { SwapMeetWatchList } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Delete a Swap Meet Watchlist
router.delete("/:swapMeetWatchListId", requireAuth, async (req, res, next) => {
    const userId = parseInt(req.user.id)
    const id = req.params.swapMeetWatchListId
    const swapMeetWatchList = await SwapMeetWatchList.findByPk(id)

    if (!swapMeetWatchList) {
        res.status(404).json({
            message: "Swap Meet Watchlist couldn't be found"
        })
    }

    if (swapMeetWatchList.ownerId !== userId) {
        res.status(403).json({
            message: "Forbidden"
        })
    }

    await swapMeetWatchList.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
