const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './public/storyContent')
    },
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
})

const uploadStory = multer({ storage: storage })

module.exports = uploadStory