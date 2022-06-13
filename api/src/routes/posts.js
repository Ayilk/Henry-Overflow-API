const { Router } = require('express');
const router = Router();
const { addPost, getPost, deletePost, updatePost, finishedPost } = require('../controllers/Post');
const { isBanned } = require('../middleware');

router.get('/', getPost);
router.get('/:idPost', getPost);
router.post('/:idUser', isBanned, addPost);
router.put('/:idPost/:idUser', updatePost);
// router.put('/:idPost/:idUser', finishedPost);
router.delete('/:idPost/:idUser', deletePost);

module.exports = router