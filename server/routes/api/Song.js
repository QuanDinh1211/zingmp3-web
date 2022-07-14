const express = require('express')
const router = express.Router()

const SongController = require('../../controllers/apiControllers/songContrllers')
const verifyTocken = require('../../middleware/verifyTocken')

const { getSong, getOneSong, getSongAlbum, getSongPlaylist, createSong, getSongName, deleteSong, likeSong, unLikeSong, UpdateSongApi } = SongController

router.get('/getSong', getSong)
router.get('/getOneSong/:songId', getOneSong)
router.get('/getSong/:albumId', getSongAlbum)
router.get('/getSongName/:songName', getSongName)
router.get('/getSongPlaylist/:playlistId', getSongPlaylist)
router.post('/createSong', verifyTocken, createSong)
router.delete('/:songId', verifyTocken, deleteSong)
router.get('/likes/:songId', verifyTocken, likeSong)
router.get('/unlikes/:songId', verifyTocken, unLikeSong)
router.put('/update/:songId', verifyTocken, UpdateSongApi)


module.exports = router