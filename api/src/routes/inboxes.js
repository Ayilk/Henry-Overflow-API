const { Router } = require('express');
const router = Router();
const { userInbox, viewNotification, cleanInbox } = require('../controllers/Inboxes')
// const {} = require('../middleware');


router.get('/:idUser', userInbox)
router.put('/:idUser/:idNotification', viewNotification)
router.delete('/:idUser/clean', cleanInbox)

module.exports = router