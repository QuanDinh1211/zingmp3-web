const fs = require('fs')
const path = require('path')

const handleDeleteMp3 = (mp3) => {
    const pathMp3 = path.join(__dirname, 'mp3', `${mp3}`)
    console.log('mp3', pathMp3);
    fs.unlinkSync(pathMp3, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = handleDeleteMp3