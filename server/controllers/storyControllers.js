const StoryService = require('./services/storyServeice')
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose')

const { hanleCreateStory, handleGetAllStory, handleGetOneStory, hanleDeleteStory, handleUplikeSong, handleUpdateStory } = StoryService


class StoryController {

    getStory = async (req, res) => {
        const listStory = await handleGetAllStory(res)
        res.render('Story/getListStory', { listStory: mutipleMongooseToObject(listStory) })
    }

    getCreateStory = async (req, res) => {
        res.render('Story/creatStory')
    }
    createStory = async (req, res) => {

        const content = req.file.originalname
        const userId = req.session.userId
        const { description } = req.body


        const formdata = {
            description,
            content,
            user: userId

        }
        const story = await hanleCreateStory(formdata, res)

        if (story) {
            res.redirect('/story/getStory')
        }
    }

    deleteStory = async (req, res) => {
        const storyId = req.params.storyId
        const story = await hanleDeleteStory(storyId, res)
        if (story) {
            res.redirect('/story/getStory')
        }
    }

    likeStory = async (req, res) => {
        const storyId = req.params.storyId
        const story = await handleGetOneStory({ _id: storyId }, res)
        if (story) {
            const { likes } = story
            const newLikes = Number(likes) + 1
            const dataStory = { likes: newLikes }
            const storyUpdated = await handleUplikeSong(storyId, dataStory, res)
            if (storyUpdated) {
                res.redirect('/story/getStory')
            }
        }
    }

    unLikeStory = async (req, res) => {
        const storyId = req.params.storyId
        const story = await handleGetOneStory({ _id: storyId }, res)
        if (story) {
            const { likes } = story
            const newLikes = Number(likes) - 1
            const dataStory = { likes: newLikes }
            const storyUpdated = await handleUplikeSong(storyId, dataStory, res)
            if (storyUpdated) {
                res.redirect('/story/getStory')
            }
        }
    }

    editStory = async (req, res) => {
        const storyId = req.params.storyId
        const story = await handleGetOneStory({ _id: storyId }, res)
        if (story) {
            res.render('Story/editStory', { story: mongooseToObject(story) })
        }
    }

    UpdateStory = async (req, res) => {
        const storyId = req.params.storyId
        const content = req.file.originalname
        const { description } = req.body


        const formdata = {
            description,
            content
        }

        const story = await handleUpdateStory(storyId, formdata, res)
        if (story) {
            res.redirect('/story/getStory')
        }
    }
}

module.exports = new StoryController