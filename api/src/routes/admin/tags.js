const { Router } = require('express');
const { adminAddTags, adminDeleteTags } = require('../../controllers/Tag');

const router = Router();

router.post('/:idModule', adminAddTags)
router.delete('/:idTag', adminDeleteTags)

module.exports = router