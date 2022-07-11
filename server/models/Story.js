const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const Story = new Schema({
    description: { type: String },
    content: { type: String },
    likes: { type: String },
    slug: { type: String, slug: 'description', unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

// add plugins
mongoose.plugin(slug)


module.exports = mongoose.model('storys', Story)
