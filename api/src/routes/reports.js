const { Router } = require('express');
const { postReport } = require('../controllers/Reports');
// const {  } = require('../middleware');

const router = Router();

router.post('/:idOf/:idUser', postReport);

module.exports = router