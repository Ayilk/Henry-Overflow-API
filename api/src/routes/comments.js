require('dotenv').config();
const { Router } = require('express');
const { updateComment, deleteComment, addComment } = require('../controllers/Comment');
const { isBanned } = require('../middleware');
const router = Router();

router.post('/:idPost/:idUser', isBanned, addComment);
router.put('/:idComment/:idUser', updateComment);
router.delete('/:idComment/:idUser', deleteComment);

module.exports = router
