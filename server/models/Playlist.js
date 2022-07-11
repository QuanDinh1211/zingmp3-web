const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const Playlist = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    description: { type: String },
    likes: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    author: { type: Array, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

// add plugins
mongoose.plugin(slug)

module.exports = mongoose.model('playlists', Playlist)