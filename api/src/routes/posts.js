
const { Router } = require('express');
const router = Router();
const { addPost, getPost, deletePost, updatePost } = require('../controllers/Post');
const { isBanned } = require('../middleware'); 

router.get('/', getPost);
router.post('/:idUser', isBanned, addPost)
router.get('/:idPost', getPost)
router.put('/:idPost', updatePost)
router.delete('/:idPost', deletePost)


module.exports = router