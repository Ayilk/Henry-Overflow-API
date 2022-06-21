const { Router } = require("express");
const { isAdmin } = require('../middleware');

const admin = require('./admin/index')
const posts = require("./posts");
const users = require("./users");
const comments = require("./comments");
const tags = require("./tags");
const modules = require("./modules");
const likes = require("./likes");
const paymentRoutes = require("./payment.routes");
const orders = require("./orders");
const favorites = require("./favorites")
const reports = require('./reports')
const inboxes = require('./inboxes')

const router = Router();

router.use("/admin", isAdmin, admin)
router.use("/posts", posts);
router.use("/users", users);
router.use("/tags", tags);
router.use("/modules", modules);
router.use("/comments", comments);
router.use("/likes", likes);
router.use("/payment", paymentRoutes);
router.use("/orders", orders);
router.use("/favorites", favorites);
router.use("/reports", reports);
router.use("/inboxes", inboxes);

router.get("/", (req, res, next)=>{res.send("Ruta principal conectada exitosamente")});

module.exports = router;
