const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const loginRouter = require("./login.js");
const signupRouter = require("./signup.js");
const showRouter = require("./show.js");
const showWatchListRouter = require("./showWatchList.js");
const swapMeetRouter = require("./swapMeet.js");
const swapMeetWatchListRouter = require("./swapMeetWatchList.js");
const reviewRouter = require("./review.js");
const postRouter = require("./post.js");

// const { User } = require("../../db/models");
// const { setTokenCookie } = require("../../utils/auth.js");

const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/shows", showRouter);
// router.use("/showWatchLists", showWatchListRouter);
router.use("/swapMeets", swapMeetRouter);
// router.use("/swapMeetWatchLists", swapMeetWatchListRouter);
// router.use("/reviews", reviewRouter);
router.use("/posts", postRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// GET /api/restore-user
// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
