const express = require('express')
const router = express.Router()

const uploadAvatar = require('../upload/avatarUpload')
const PlaylistController = require('../../controllers/apiControllers/playlistControlers')
const verifyTocken = require('../../middleware/verifyTocken')

const { getPlaylist, createPlaylist, deletePlaylist, likePlaylist, unLikePlaylist, getOnePlaylist, UpdatePlaylist } = PlaylistController

router.get('/getPlaylist', getPlaylist)
router.post('/createPlaylist', verifyTocken, createPlaylist)
router.delete('/:playlistId', verifyTocken, deletePlaylist)
router.get('/likes/:playlistId', verifyTocken, likePlaylist)
router.get('/unlikes/:playlistId', verifyTocken, unLikePlaylist)
router.put('/update/:playlistId', verifyTocken, uploadAvatar.single('avatar'), UpdatePlaylist)
router.get('/:playlistId', getOnePlaylist)


module.exports = router