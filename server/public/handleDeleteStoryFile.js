const fs = require('fs')
const path = require('path')

const handleDeleteStory = (story) => {
    const pathImg = path.join(__dirname, 'storyContent', `${story}`)
    console.log(pathImg);
    fs.unlinkSync(pathImg, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = handleDeleteStory