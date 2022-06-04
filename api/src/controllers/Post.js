const { Post, Tag, User, Comment, Module, Like } = require("../db");

const getPost = (req, res, next) => {
  const { idPost } = req.params;
  const title = req.query.title;

  Post.findAll({
    include: [
      {
        model: Tag,
        attributes: { exclude: ["moduleId"] },
        through: {
          attributes: [],
        },
      },
      {
        model: Like,
        attributes: {
          exclude: ["commentId"],
        },
      },
      {
        model: Module,
      },
      {
        model: Comment,
        include: [
          { model: User },
          { model: Like, attributes: { exclude: ["postId"] } },
        ],
        attributes: { exclude: ["userId", "postId"] },
      },
      {
        model: User,
      },
    ],
    attributes: { exclude: ["userId", "moduleId"] },
  })
    .then((post) => {
      if (idPost) {
        let postId = post.filter((el) => el.id == idPost);
        return postId.length
          ? res.send(postId)
          : res.status(404).send("question not found");
      }
      if (title) {
        let postTitle = post.filter((el) =>
          el.title.toLowerCase().includes(title.toLowerCase())
        );
        return postTitle.length
          ? res.send(postTitle)
          : res.status(404).send("question not found");
      }
      return res.send(post);
    })
    .catch((error) => next(error));
};

const addPost = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const createdBy = await User.findByPk(idUser);

    const { title, message, rating, tag, module } = req.body;
    const postCreated = await Post.create({
      title,
      message,
      rating,
    });
    const tags = await Tag.findAll({
      where: {
        name: tag,
      },
    });
    const section = await Module.findAll({
      where: {
        name: module,
      },
    });
    postCreated.addTag(tags);
    section[0].addPost(postCreated);
    createdBy.addPost(postCreated);
    return res.send("Post done successfully");
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { idPost } = req.params;
  const { title, message, rating, tag } = req.body;
  try {
    const postUpdate = await Post.findByPk(idPost);
    const allTags = await Tag.findAll({
      where: {
        name: tag,
      },
    });
    console.log(allTags);
    await postUpdate.setTags(allTags);
    const updateSuccess = await Post.update(
      { title, message, rating },
      {
        where: { id: idPost },
        raw: true,
      }
    );
    return updateSuccess[0] === 1
      ? res.send("Post actualizado con exito!")
      : res.status(400).send("No se pudo actualizar el Post");
  } catch (error) {
    next(error);
  }
};

const deletePost = (req, res, next) => {
  const { idPost } = req.params;
  return Post.destroy({
    where: {
      id: idPost,
    },
  })
    .then(() => res.status(200).send("post deleted successfully"))
    .catch((error) => next(error));
};

module.exports = {
  getPost,
  addPost,
  updatePost,
  deletePost,
};
