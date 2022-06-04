const { Router } = require("express");

const posts = require("./posts");
const users = require("./users");
const comments = require("./comments");
const tags = require("./tags");
const modules = require("./modules");
const likes = require("./likes");

const router = Router();

router.use("/posts", posts);
router.use("/users", users);
router.use("/tags", tags);
router.use("/modules", modules);
router.use("/comments", comments);
router.use("/likes", likes);

module.exports = router;
