const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    password: { type: String, required: true },
    description: { type: String },
    followers: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, { timestamps: true })

// add plugins
mongoose.plugin(slug)

module.exports = mongoose.model('users', User)