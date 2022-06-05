const { Router } = require('express');
const { updateFavoriteOf, getFavoritesUser } = require('../controllers/Favorites');
// const {} = require('../middleware');

const router = Router();

router.put('/:idOf/:idUser', updateFavoriteOf);
router.get('/:idUser', getFavoritesUser);

module.exports = router