// const jwt = require("jsonwebtoken");
const { User } = require("../db");

const isAdmin = async (req, res, next) => {
  const idUser = req.header("authorization");
  try {
    if (!idUser) return res.status(404).json({ errorMsg: "Header not sent" });
    const user = await User.findByPk(idUser);
    if (!user.isAdmin) {
      return res.status(401).send({ errorMsg: "Unauthorized content." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isBanned = async (req, res, next) => {
  const idUser = req.header("authorization");
  try {
    if (!idUser) return res.status(404).json({ errorMsg: "Header not sent" });
    const user = await User.findByPk(idUser);
    if (user.isBanned) {
      return res.status(401).send({ Locked: "Banned user" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isBanned,
};
