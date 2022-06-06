const { Post, User, Comment } = require("../db");
const { addNotification } = require('./Inboxes');


const addComment = async(req, res, next) => {
    const { idPost, idUser } = req.params
    const obj = {};

  try {
    const createdInPost = await Post.findByPk(idPost, { include: [User] });
    const createdBy = await User.findByPk(idUser);

    const newComment = await Comment.create(req.body);
    createdBy.addComment(newComment);
    createdInPost.addComment(newComment);
    
    obj.id = newComment.dataValues.id;
    obj.message = req.body.message;
    obj.rating = newComment.dataValues.rating;
    obj.user = {
      first_name: createdBy.dataValues.first_name,
      id: createdBy.dataValues.id,
      last_name: createdBy.dataValues.last_name,
    };
    obj.notification = false
    
    if(createdInPost.dataValues.user.id !== createdBy.dataValues.id) {
      addNotification("comment", newComment.dataValues.id, createdInPost.dataValues.user.id);
      obj.notification = true
    }
  
    res.send(obj);
  } catch (error) {
    next(error);
  }
};

const updateComment = (req, res, next) => {
  const { idComment } = req.params;
  const { message, rating } = req.body;
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

const deleteComment = (req, res, next) => {
  const { idComment } = req.params;
  return Comment.destroy({
    where: {
      id: idComment,
    },
  })
    .then(() => res.status(200).send("Comment deleted successfully"))
    .catch((error) => next(error));
};

module.exports = {
  updateComment,
  deleteComment,
  addComment,
};
