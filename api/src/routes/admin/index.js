const { Router } = require("express");

const reports = require('./reports')
const router = Router();

router.use("/reports", reports);

module.exports = router;
