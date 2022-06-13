require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { getAllTags, plusOneTag } = require("../controllers/Tag");
// const {} = require('../middleware');

router.get("/", getAllTags);
router.put("/mas-uno/:idTag", plusOneTag);

module.exports = router;
