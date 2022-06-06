const { Router } = require('express');
const { adminBanUser } = require('../../controllers/Users');

const router = Router();

router.put('/', adminBanUser)

module.exports = router