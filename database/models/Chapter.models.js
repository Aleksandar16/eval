const { Schema, default: mongoose } = require("mongoose");

const ChapterSchema = new Schema({
    title: {type: String, required: true},
    lessons: {type: Number, required: true},
    active: {type: Boolean},
}, {
    timestamps: true,
})

module.exports.Chapter = mongoose.model('chapter', ChapterSchema)