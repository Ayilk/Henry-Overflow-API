const { Router } = require("express");

const reports = require("./reports");
const tags = require("./tags");
const users = require("./users");
const router = Router();

router.use("/reports", reports);
router.use("/tags", tags);
router.use("/users", users);

module.exports = router;
