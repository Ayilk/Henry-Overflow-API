const { Post, User, Like, Comment } = require("../db");

const updateLikeOf = async (req, res, next) => {
  const { idOf, idUser } = req.params;
  // const idUser = req.idUser
  try {
    const likeInPost = await Post.findByPk(idOf);
    const likeInComment = likeInPost ? false : await Comment.findByPk(idOf);

    let response = likeInComment ? "comment" : "post";

    const likedBy = await User.findByPk(idUser);

    const exist = await Like.findAll(
      likeInComment
        ? {
            where: {
              userId: idUser,
              commentId: idOf,
            },
          }
        : {
            where: {
              userId: idUser,
              postId: idOf,
            },
          }
    );

    if (!exist.length) {
      const newLike = await Like.create();
      likeInComment
        ? likeInComment.addLike(newLike)
        : likeInPost.addLike(newLike);
      likedBy.addLike(newLike);
      return res.send(`Like ${response} successful`);
      
    } else {
      await exist[0].destroy();
      return res.send(`Dislike ${response} successful`);
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
