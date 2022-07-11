const express = require('express')
const router = express.Router()

const uploadStory = require('../upload/uploadStory')
const StoryController = require('../../controllers/apiControllers/storyControllers')
const verifyTocken = require('../../middleware/verifyTocken')


const { getStory, createStory, deleteStory, likeStory, unLikeStory, UpdateStory } = StoryController

router.get('/getStory', getStory)
router.post('/createStory', verifyTocken, createStory)
router.delete('/:storyId', verifyTocken, deleteStory)
router.get('/likes/:storyId', verifyTocken, likeStory)
router.get('/unlikes/:storyId', verifyTocken, unLikeStory)
router.put('/update/:storyId', verifyTocken, uploadStory.single('content'), UpdateStory)


module.exports = router