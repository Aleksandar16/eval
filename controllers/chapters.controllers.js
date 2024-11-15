const { Chapter } = require("../database/models/Chapter.models")

module.exports.createChapter = async (req, res, next) => {
    const body = req.body

    const newChapter = new Chapter({
        ...body
    })

    await newChapter.save()
    return res.status(201).json({message: `Chapter ${body.title} added successfuly`});
}

module.exports.getChapters = async (req, res, next) => {
    const chapters = await Chapter.find()
    return res.status(200).json(chapters); 
}

module.exports.getChapterById = async (req, res, next) => {
    const id = req.params.id
    const chapter = await Chapter.findById(id)
    if(!chapter) return res.status(404).json({message: `No chapter available for id : ${id}`})
    return res.status(200).json(chapter)
}

module.exports.deleteChapter = async (req, res, next) => {
    const id = req.params.id
    const chapter = await Chapter.findById(id)
    if(!chapter) return res.status(404).json({message: `No chapter available for id : ${id}`})
    const message = `Chapter ${chapter.title} with id : ${id} has been deleted`
    await chapter.deleteOne()
    return res.status(200).json({message: message})
}