const { Post, User, Comment } = require("../db");
const { addNotification } = require("./Inboxes");

const addComment = async (req, res, next) => {
  const { idPost, idUser } = req.params;
  const { message } = req.body;
  const obj = {};

  try {
    const createdInPost = await Post.findByPk(idPost, {
      include: [User, Comment],
    });
    const createdBy = await User.findByPk(idUser);
    if (!createdInPost || !createdBy)
      return res.status(404).send("Parametros invalidos");

    let exist = createdInPost.dataValues.comments.find(
      (e) => e.dataValues.message === message
    );
    if (exist) {
      return res
        .status(400)
        .send("Rechazado, ya existe este comentario en el posteo");
    }

    const newComment = await Comment.create({
      message,
    });
    createdBy.addComment(newComment);
    createdInPost.addComment(newComment);

    obj.id = newComment.dataValues.id;
    obj.message = req.body.message;
    obj.rating = newComment.dataValues.rating;
    obj.user = {
      first_name: createdBy.dataValues.first_name,
      last_name: createdBy.dataValues.last_name,
      id: createdBy.dataValues.id,
    };
    obj.notification = false;

    if (createdInPost.dataValues.user.id !== createdBy.dataValues.id) {
      addNotification(
        "comment",
        newComment.dataValues.id,
        createdInPost.dataValues.user.id
      );
      obj.notification = true;
    }

    res.send(obj);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  const { idComment, idUser } = req.params;
  const { message, rating } = req.body;
  const comment = await Comment.findByPk(idComment, { include: [User] });
  const ownUser = await User.findByPk(idUser);

  if (!comment || !ownUser) return res.status(404).send("Datos no encontrados");

  if (comment.dataValues.user.id !== ownUser.id) {
    return res
      .status(400)
      .send(
        "Accion denegada, solo el propietario puede actualizar el comentario"
      );
  }

  return Comment.update(
    { message, rating },
    {
      where: { id: idComment },
      raw: true,
    }
  )
    .then((r) =>
      r[0] === 1
        ? res.send("Comentario Actualizado con exito!")
        : res.status(404).send("No se pudo actualizar el comentario")
    )
    .catch((error) => next(error));
};

const deleteComment = async (req, res, next) => {
  const { idComment, idUser } = req.params;
  try {
    const comment = await Comment.findByPk(idComment, { include: [User] });
    const user = await User.findByPk(idUser);

    if (!comment || !user) return res.status(404).send("Datos no encontrados");

    if (comment.dataValues.user.id === user.id || user.isAdmin) {
      await Comment.destroy({
        where: {
          id: idComment,
        },
      });
    } else
      return res
        .status(400)
        .send(
          "Accion denegada, solo el propietario puede eliminar el comentario"
        );

    res.send("Comment deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateComment,
  deleteComment,
  addComment,
};
