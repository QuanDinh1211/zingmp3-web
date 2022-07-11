const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const Library = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    product: { type: String, required: true },
    category: { type: String, enum: ['SONG', 'ALBUM', 'PLAYLIST', 'USER'] },
    slug: { type: String, slug: 'user', unique: true },
}, { timestamps: true })

// add plugins
mongoose.plugin(slug)

module.exports = mongoose.model('librarys', Library)