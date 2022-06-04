const { User, Post, Comment } = require("../db");
// const jwt = require('jsonwebtoken');
// const { isAdmin } = require('../middleware');
// require('dotenv').config()

const getUser = async (req, res, next) => {
  const { idUser } = req.params;
  const { fullname } = req.query;

  try {
    if (idUser) {
      const userDetail = await User.findByPk(idUser, {
        include: [
          {
            model: Post,
            attributes: { exclude: ["userId"] },
          },
          {
            model: Comment,
            attributes: { exclude: ["userId"] },
          },
        ],
      });
      return userDetail
        ? res.status(200).send(userDetail)
        : res.status(400).send("user not found");
    }
    const response = await User.findAll();

    if (fullname) {
      let userName = response.filter((el) =>
        el.full_name.toLowerCase().includes(fullname.toLowerCase())
      );
      return userName.length
        ? res.send(userName)
        : res.status(400).send("User not found");
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const logintUser = async (req, res, next) => {
  const { nickname, picture, name, email } = req.body;

  let arrayName = name.split(" ");
  const firstName = arrayName.shift();
  const lastName = arrayName.join(" ");

  try {
    const [user, boolean] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        nick: nickname,
        image: picture,
        first_name: firstName,
        last_name: lastName,
      },
    });

    res.json({
      user: user,
      isCreated: boolean,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = (req, res, next) => {
  const { idUser } = req.params;
  const {
    first_name,
    last_name,
    email,
    about,
    rating,
    badges,
    isAdmin,
    role,
    twitter,
    github,
    portfolio,
  } = req.body;
  return User.update(
    {
      first_name,
      last_name,
      email,
      about,
      rating,
      badges,
      isAdmin,
      role,
      twitter,
      github,
      portfolio,
    },
    {
      where: { id: idUser },
      raw: true,
    }
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => next(error));
};

// const deleteUser = (req, res, next) => {
//     const id = req. params.id;
//     return User.destroy({
//         where: {
//             id
//         }
//     }).then(() => {res.status(200).send("User deleted successfully")})
//     .catch(error => next(error))
// }

module.exports = {
  getUser,
  logintUser,
  updateUser,
  // deleteUser
};
