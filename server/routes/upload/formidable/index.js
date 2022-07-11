const express = require('express')
const router = express.Router()

const uploadAvatar = require('../avatarUpload')
const uploadMp3 = require('../mp3Upload')
const uploadStory = require('../uploadStory')
const uploadAvatarControler = require('./uploadAvatar')
const uploadMp3Controler = require('./uploadMp3')
const uploadStoryControler = require('./uploadStory')

router.post('/avatar', uploadAvatar.single('avatar'), uploadAvatarControler)
router.post('/mp3', uploadMp3.single('mp3'), uploadMp3Controler)
router.post('/content', uploadStory.single('content'), uploadStoryControler)



module.exports = router