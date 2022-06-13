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
          ? res.send(postId[0])
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
  const { idUser } = req.params;
  const { title, message, tag, module } = req.body;
  try {
    const createdBy = await User.findByPk(idUser);

    const exist = await Post.findAll({
      where: {
        title,
        message,
      },
    });

    if (exist.length)
      return res
        .status(400)
        .send("Rechazado, ya existe un posteo con el mismo titulo y mensaje");

    const postCreated = await Post.create({
      title,
      message,
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
    res.json(postCreated);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { idPost, idUser } = req.params;
  const { title, message, tag } = req.body;
  try {
    const postUpdate = await Post.findByPk(idPost, { include: [User, Module] });
    const ownUser = await User.findByPk(idUser);

    if (!postUpdate || !ownUser)
      return res.status(404).send("Datos no encontrados");

    if (ownUser.id !== postUpdate.dataValues.user.id) {
      return res
        .status(400)
        .send("Accion denegada, solo el propietario puede actualizar el post");
    }

    if (tag) {
      const allTags = await Tag.findAll({
        where: {
          name: tag,
        },
        include: [Module],
      });
      let pass = allTags.find(
        (e) => e.dataValues.module.name !== postUpdate.dataValues.module.name
      );
      if (Boolean(pass))
        return res
          .status(400)
          .send(
            `Tags deben pertenecer a Modulo ${postUpdate.dataValues.module.name}`
          );
      await postUpdate.setTags(allTags);
    }

    const updateSuccess = await Post.update(
      { title, message },
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


const deletePost = async (req, res, next) => {
  const { idPost, idUser } = req.params;
  try {
    const post = await Post.findByPk(idPost, { include: [User] });
    console.log(post)
    const user = await User.findByPk(idUser);

    if (!post || !user) return res.status(404).send("Datos no encontrados");

    if (post.dataValues.user.id === user.id || user.isAdmin) {
      await Post.destroy({
        where: {
          id: idPost,
        },
      });
    } else
      return res
        .status(400)
        .send("Accion denegada, solo el propietario puede eliminar el posteo");

    res.send("Post deleted successfully");
  } catch (error) {
    next(error);
  }
};


const finishedPost = async (req, res, next) => {
  const { idPost, idUser } = req.params;
  const { finished } = req.body;


  try {


    console.log('holis')

    const post = await Post.findByPk(idPost, { include: [User] });
    const user = await User.findByPk(idUser);

    console.log('hola', finished, post, user)

    if (!post)
      return res.status(404).send("Datos no encontrados");

    const postFinished = await Post.update(
      { finished },
      {
        where: { id: idPost },
        // raw: true,
      }
    );

    console.log('Este es el post finalizado:', postFinished);

    return postFinished[0] === 1
      ? res.send("Post actualizado con exito!")
      : res.status(400).send("No se pudo actualizar el Post");
  } catch (error) {
    console.log(error)
  }
};


// const finishedPost = async (req, res, next) => {
//   const { idPost, idUser } = req.params;
//   const { title, message, tag, finished } = req.body;
//   try {
//     const postUpdate = await Post.findByPk(idPost, { include: [User, Module] });
//     const ownUser = await User.findByPk(idUser);
//     console.log(postUpdate)

//     if (!postUpdate || !ownUser)
//       return res.status(404).send("Datos no encontrados");

//     if (ownUser.id !== postUpdate.dataValues.user.id) {
//       return res
//         .status(400)
//         .send("Accion denegada, solo el propietario puede actualizar el post");
//     }

//     if (tag) {
//       const allTags = await Tag.findAll({
//         where: {
//           name: tag,
//         },
//         include: [Module],
//       });
//       let pass = allTags.find(
//         (e) => e.dataValues.module.name !== postUpdate.dataValues.module.name
//       );
//       if (Boolean(pass))
//         return res
//           .status(400)
//           .send(
//             `Tags deben pertenecer a Modulo ${postUpdate.dataValues.module.name}`
//           );
//       await postUpdate.setTags(allTags);
//     }

//     const updateSuccess = await Post.update(
//       {
//         title,
//         message,
//         finished
//       },
//       {
//         where: { id: idPost },
//         raw: true,
//       }
//     );
//     return updateSuccess[0] === 1
//       ? res.send("Post actualizado con exito!")
//       : res.status(400).send("No se pudo actualizar el Post");
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getPost,
  addPost,
  updatePost,
  deletePost,
  finishedPost
};
