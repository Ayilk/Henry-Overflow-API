const { Router } = require('express');
const { getReports, deleteReport } = require('../../controllers/Reports');
// const {  } = require('../middleware');

const router = Router();

router.get('/', getReports);
router.get('/:idReport', getReports);
router.delete('/:idReport', deleteReport)

module.exports = router