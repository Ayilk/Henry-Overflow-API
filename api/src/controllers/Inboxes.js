const { Inbox, Like, Comment, Post, User } = require("../db");

async function addNotification(is, idIs, idUser) {
  let newNotification

  if(is === "comment") {
    newNotification = await Inbox.create({
      userId: idUser,
      commentId: idIs
    })
  };
  if(is === "like") {
    newNotification = await Inbox.create({
      userId: idUser,
      likeId: idIs
    })
  };
  return true
}

const userInbox = async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const notifications = await Inbox.findAll({
      where: {
        userId: idUser,
      },
      include: [
        { model: Like, include: [
          { model: User },
          { model: Post },
          { model: Comment, include: [
            { model: Post }
          ] }
        ]},
        { model: Comment, include: [
          { model: User },
          { model: Post }
        ] },
      ],
      attributes: { exclude: ["userId"] }
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

const viewNotification = async (req, res, next) => {
  const { idUser, idNotification } = req.params;
  const { clean } = req.query;
  try {
    if(clean === "true") {
        await Inbox.destroy({
            where: {
                id: idNotification
            }
        });
        return res.send("notification deleted")
    };

    const response = await Inbox.update(
      {
        isActive: false,
      },
      {
        where: {
          id: idNotification,
          userId: idUser,
        },
      }
    );
    res.json({read: Boolean(parseInt(response))})
  } catch (error) {
    next(error);
  }
};

const cleanInbox = async (req, res, next) => {
  const { idUser } = req.params;
  try {
      const cleanAll = await Inbox.destroy({
          where: {
              userId: idUser
          }
      })
      res.json({cleaned: cleanAll})
  } catch (error) {
    next(error);
  }
};


module.exports = {
  userInbox,
  viewNotification,
  cleanInbox,
  addNotification
};
