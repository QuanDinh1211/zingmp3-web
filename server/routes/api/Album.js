const express = require('express')
const router = express.Router()

const uploadAvatar = require('../upload/avatarUpload')
const AlbumController = require('../../controllers/apiControllers/albumControllers')
const verifyTocken = require('../../middleware/verifyTocken')

const { getAlbum, createAlbum, deleteAlbum, likeAlbum, unLikeAlbum, getOneAlbum, UpdateAlbum } = AlbumController

router.get('/getAlbum', getAlbum)
router.post('/createAlbum', verifyTocken, createAlbum)
router.delete('/:albumId', verifyTocken, deleteAlbum)
router.get('/likes/:albumId', verifyTocken, likeAlbum)
router.get('/unlikes/:albumId', verifyTocken, unLikeAlbum)
router.put('/update/:albumId', verifyTocken, uploadAvatar.single('avatar'), UpdateAlbum)
router.get('/:albumId', getOneAlbum)


module.exports = router