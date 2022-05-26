const { Post, User, Comment } = require('../db');

// const getComment = (req, res, next) => {
//     const id = req.params.id;

//          Comment.findAll({
//             include: [
//                 {
//                 model: Post,
//                 attributes: ["title", "id"],
//                 // through: {
//                 //     attributes: []
//                 // }
//                 },                
//                 {                    
//                 model: User,
//                 attributes: ["first_name", "last_name", "id"],                 
//                 }       
//             ]
//         }).then(comment => {
//             if(id){
//                 let commentId = comment.filter(el => el.id == id);
//                 commentId.length ? res.status(200).send(commentId) : res.status(400).send("Comment not found")
//             } 
            
//            return  res.send(comment)})
//         .catch(error => next(error))
    
// }

const addComment = async(req, res, next) => {
    const { idPost, idUser } = req.params
    try {
        const createdInPost = await Post.findByPk(idPost, { include: [User] })
        const createdBy = await User.findByPk(idUser)

        const newComment = await Comment.create(req.body);
        createdBy.addComment(newComment)
        createdInPost.addComment(newComment)
        res.send("Comentario enviado con exito")
    } catch (error) {
        next(error)
    }
}


const updateComment = (req, res, next) => {
    const { idComment } = req.params;
    const {message, rating} = req.body;
    return Comment.update(
        {message, rating},{
            where: {id: idComment},  raw : true 
        },
    ).then(updatedComment => res.send(updatedComment))
    .catch(error => next(error))
}

const deleteComment = (req, res, next) => {
    const { idComment } = req.params;
    return Comment.destroy({
        where: {
            id: idComment
        }
    }).then(() => {res.status(200).send("Comment deleted successfully")})
    .catch(error => next(error))
}

module.exports = {
    updateComment,
    deleteComment,
    addComment
    // getComment,
}