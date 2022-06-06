const { Router } = require("express");

const reports = require("./reports");
const comments = require("./comments");
const posts = require("./posts");
const tags = require("./tags");
const users = require("./users");
const router = Router();

router.use("/reports", reports);
router.use("/comments", comments);
router.use("/posts", posts);
router.use("/tags", tags);
router.use("/users", users);

module.exports = router;
