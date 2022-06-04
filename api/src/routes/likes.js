
const { Router } = require('express');
const { updateLikeOf, getLikeOf } = require('../controllers/Likes');
// const {} = require('../middleware');

const router = Router();

router.put('/:idOf/:idUser', updateLikeOf);
router.get('/:idOf', getLikeOf);

module.exports = router