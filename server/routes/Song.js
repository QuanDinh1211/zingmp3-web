const express = require('express')
const router = express.Router()

const uploadMp3 = require('./upload/mp3Upload')
const SongController = require('../controllers/songContrllers')
const verifyTocken = require('../middleware/verifyTocken')

const { getSong, getCreateSong, createSong, deleteSong, likeSong, unLikeSong, editSong, UpdateSong } = SongController

router.get('/getSong', getSong)
router.get('/createSong', getCreateSong)
router.post('/createSong', uploadMp3.single('mp3'), createSong)
router.delete('/:songId', deleteSong)
router.get('/likes/:songId', likeSong)
router.get('/unlikes/:songId', unLikeSong)
router.get('/edit/:songId', editSong)
router.put('/update/:songId', uploadMp3.single('mp3'), UpdateSong)


module.exports = router