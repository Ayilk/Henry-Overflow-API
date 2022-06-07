const { Post, User, Like, Comment, Inbox } = require("../db");
const { addNotification } = require("./Inboxes");

const updateLikeOf = async (req, res, next) => {
  const { idOf, idUser } = req.params;

  try {
    const likedBy = await User.findByPk(idUser);
    const likeInPost = await Post.findByPk(idOf, { include: [User] });
    const likeInComment = likeInPost ? false : await Comment.findByPk(idOf, { include: [User] });
    
    if(!likedBy || (!likeInComment && !likeInPost)) {
      return res.status(404).send("Datos no encontrados")
    }
    
    let response = likeInComment ? "comment" : "post";
    const owner = likeInComment ? likeInComment.dataValues.user.id : likeInPost.dataValues.user.id;

    const exist = await Like.findAll(
      likeInComment
        ? {
            where: {

              userId: idUser,
              commentId: idOf,
            },
            include: [Inbox],
          }
        : {
            where: {
              userId: idUser,
              postId: idOf,
            },
            include: [Inbox],
          }
    );

    if (!exist.length) {
      const newLike = await Like.create();
      likeInComment
        ? likeInComment.addLike(newLike)
        : likeInPost.addLike(newLike);
      likedBy.addLike(newLike);

      let notification = false;
      if (likedBy.dataValues.id !== owner) {
        const created = await addNotification("like", newLike.dataValues.id, owner);
        notification = created;
      };
      return res.send(`Like ${response} successful and notification ${notification}`);
    } else {
      let notification = false;
      const deleted = await Inbox.destroy({
        where: {
          id: exist[0].dataValues.inboxes[0].dataValues.id,
        },
      });
      await exist[0].destroy();
      notification = Boolean(deleted);
      return res.send(`Dislike ${response} successful and destroyed notification ${notification}`);
    }
  } catch (error) {
    next(error);
  }
};

const getLikeOf = async (req, res, next) => {
  const { idOf } = req.params;
  try {
    const likeInPost = await Post.findByPk(idOf);
    const likeInComment = likeInPost ? false : await Comment.findByPk(idOf);

    let response = likeInComment ? "comment likes" : "post likes";
    const countLikes = likeInComment
      ? await likeInComment.countLikes()
      : await likeInPost.countLikes();

    res.json({ [response]: countLikes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateLikeOf,
  getLikeOf,
};
