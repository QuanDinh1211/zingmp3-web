const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './public/img')
    },
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
})

const uploadAvatar = multer({ storage: storage })

module.exports = uploadAvatar