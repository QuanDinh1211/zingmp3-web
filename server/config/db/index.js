const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/zingmp3', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successfully connected to Mongo')
    } catch (err) {
        console.error('Error in DB connection: ' + err)
    }
}

module.exports = { connect }