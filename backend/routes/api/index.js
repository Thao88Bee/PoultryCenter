const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./user.js");
const loginRouter = require("./login.js");
const signupRouter = require("./signup.js");
const showRouter = require("./show.js");
const swapMeetRouter = require("./swapMeet.js");
const postRouter = require("./post.js");
const reviewRouter = require("./review.js");

const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/user", usersRouter);
router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/shows", showRouter);
router.use("/swapMeets", swapMeetRouter);
router.use("/posts", postRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
