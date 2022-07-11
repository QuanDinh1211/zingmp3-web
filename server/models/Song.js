const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const Song = new Schema({
    name: { type: String, required: true },
    mp3: { type: String, required: true },
    views: { type: String },
    album: { type: Schema.Types.ObjectId, ref: 'albums' },
    playlist: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

// add plugins
mongoose.plugin(slug)

module.exports = mongoose.model('songs', Song)