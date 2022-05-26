const { Router } = require('express');

const postRouter = require('./Post')
const users = require('./users')
const comments = require('./comments')
const tags = require('./tags')
const modules = require('./modules')

const router = Router();

router.use('/post', postRouter)
router.use('/users', users)
router.use('/tags', tags)
router.use('/modules', modules)
router.use('/comments', comments)


router.use('/', (req, res) => {
    res.status(200).send({message: "Ruta principal conectada exitosamente"})
})

module.exports = router;
