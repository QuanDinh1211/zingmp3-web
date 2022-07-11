const fs = require('fs')
const path = require('path')

const handleDeleteAvatar = (avatar) => {
    const pathImg = path.join(__dirname, 'img', `${avatar}`)
    console.log(pathImg);
    fs.unlinkSync(pathImg, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = handleDeleteAvatar