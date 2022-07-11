const express = require('express')
const router = express.Router()

const uploadAvatar = require('./upload/avatarUpload')
const AlbumController = require('../controllers/albumControlers')
const verifyTocken = require('../middleware/verifyTocken')

const { getAlbum, getCreateAlbum, createAlbum, deleteAlbum, likeAlbum, unLikeAlbum, editAlbum, UpdateAlbum } = AlbumController

router.get('/getAlbum', getAlbum)
router.get('/createAlbum', getCreateAlbum)
router.post('/createAlbum', uploadAvatar.single('avatar'), createAlbum)
router.delete('/:albumId', deleteAlbum)
router.get('/likes/:albumId', likeAlbum)
router.get('/unlikes/:albumId', unLikeAlbum)
router.get('/edit/:albumId', editAlbum)
router.put('/update/:albumId', uploadAvatar.single('avatar'), UpdateAlbum)


module.exports = router