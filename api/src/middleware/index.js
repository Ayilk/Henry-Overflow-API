// const jwt = require("jsonwebtoken");
const { User } = require("../db");

const isAdmin = async (req, res, next) => {
  const idUser = req.header("authorization");
  try {
    let user = await User.findByPk(idUser);
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
    let user = await User.findByPk(idUser);
    if (user.isBanned) {
      return res.status(401).send({ errorMsg: "Unauthorized request." });
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
