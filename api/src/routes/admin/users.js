const { Router } = require('express');
const { adminBanUser } = require('../../controllers/Users');

const router = Router();

router.put('/ban/:idUser', adminBanUser)

module.exports = router