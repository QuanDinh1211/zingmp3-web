const express = require('express')
const router = express.Router()

const uploadAvatar = require('./upload/avatarUpload')
const PlaylistController = require('../controllers/playlistControlers')
const verifyTocken = require('../middleware/verifyTocken')

const { getPlaylist, getCreatePlaylist, createPlaylist, deletePlaylist, likePlaylist, unLikePlaylist, editPlaylist, UpdatePlaylist } = PlaylistController

router.get('/getPlaylist', getPlaylist)
router.get('/createPlaylist', getCreatePlaylist)
router.post('/createPlaylist', uploadAvatar.single('avatar'), createPlaylist)
router.delete('/:playlistId', deletePlaylist)
router.get('/likes/:playlistId', likePlaylist)
router.get('/unlikes/:playlistId', unLikePlaylist)
router.get('/edit/:playlistId', editPlaylist)
router.put('/update/:playlistId', uploadAvatar.single('avatar'), UpdatePlaylist)


module.exports = router