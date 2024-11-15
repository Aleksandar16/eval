const { Router } = require("express");
const { createChapter, getChapters, getChapterById, deleteChapter } = require("../controllers/chapters.controllers");

const router = Router()

router.post('/chapter', createChapter)
router.get('/chapter/:id', getChapterById)
router.get('/chapter', getChapters)
router.delete('/chapter/:id', deleteChapter)

module.exports = router