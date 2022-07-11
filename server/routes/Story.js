const express = require('express')
const router = express.Router()

const uploadStory = require('./upload/uploadStory')
const StoryController = require('../controllers/storyControllers')
const verifyTocken = require('../middleware/verifyTocken')

const { getStory, getCreateStory, createStory, deleteStory, likeStory, unLikeStory, editStory, UpdateStory } = StoryController

router.get('/getStory', getStory)
router.get('/createStory', getCreateStory)
router.post('/createStory', uploadStory.single('content'), createStory)
router.delete('/:storyId', deleteStory)
router.get('/likes/:storyId', likeStory)
router.get('/unlikes/:storyId', unLikeStory)
router.get('/edit/:storyId', editStory)
router.put('/update/:storyId', uploadStory.single('content'), UpdateStory)


module.exports = router