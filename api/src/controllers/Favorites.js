const { Post, User, Comment, Favorite } = require("../db");

const updateFavoriteOf = async (req, res, next) => {
  const { idOf, idUser } = req.params;
  try {
    const favoritePost = await Post.findByPk(idOf);
    const favoriteComment = favoritePost ? false : await Comment.findByPk(idOf);
    const favByUser = await User.findByPk(idUser);

    if(!favByUser || (!favoritePost && !favoriteComment)) {
      return res.status(404).send("Datos no encontrados")
    }

    let response = favoriteComment ? "comment" : "post";


    const exist = await Favorite.findAll(
      favoriteComment
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
      const newLike = await Favorite.create({
        commentOrPost: response,
      });
      favoriteComment
        ? favoriteComment.addFavorite(newLike)
        : favoritePost.addFavorite(newLike);
      favByUser.addFavorite(newLike);
      return res.send(`Added ${response} to favorites`);
    } else {
      await exist[0].destroy();
      return res.send(`Removed ${response} from favorites`);
    }
  } catch (error) {
    next(error);
  }
};

const getFavoritesUser = async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const favsByUser = await User.findByPk(idUser);
    if(!favsByUser) return res.status(404).send("User not found")
    const allFavs = await favsByUser.getFavorites({ include: [
      {
        model: Post,
        include: [
          {
            model: User,
          }
        ]
      },
      {
        model: Comment,
      }
    ]});

    res.json({ Favorites: allFavs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateFavoriteOf,
  getFavoritesUser,
};
