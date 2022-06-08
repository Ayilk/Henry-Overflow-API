const { Tag, Module } = require('../db')


const getAllTags = async(req, res, next) => {
    try {
        const response = await Tag.findAll()
        res.json(response)
    } catch (error) {
        next(error)
    }
};

const adminAddTags = async(req, res, next) => {
    const { tag } = req.body;
    const { idModule } = req.params;
    try {
        if(!tag || !idModule) return res.status(400).send("Incomplete fields")
        const module = await Module.findByPk(idModule);
        if(!module) return res.status(404).send("Module not found")
        const exist = await Tag.findAll({
            where: { name: tag }
        });
        if(exist.length) return res.status(400).send("Tag ya existente!")
        const newTag = await Tag.create({
            name: tag
        });
        module.addTag(newTag)
        res.json(newTag.id)
    } catch (error) {
        next(error)
    }
};

const adminDeleteTags = async(req, res, next) => {
    const { idTag } = req.params
    try {
        if(!idTag) return res.send("Incomplete fields");
        const deleted = await Tag.destroy({
            where: {
                id: idTag
            }
        });
        res.json({deleted: Boolean(deleted)})
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllTags,
    adminAddTags, 
    adminDeleteTags
}