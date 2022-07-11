const multer = require('multer')

const storagemp3 = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './public/mp3')
    },
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
})

const uploadMp3 = multer({ storage: storagemp3 })

module.exports = uploadMp3