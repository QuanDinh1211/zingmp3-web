const StoryService = require('../services/storyServeice')

const { hanleCreateStory, handleGetAllStory, handleGetOneStory, hanleDeleteStory, handleUplikeSong, handleUpdateStory } = StoryService


class StoryController {

    getStory = async (req, res) => {
        const listStory = await handleGetAllStory(res)
        if (listStory) {
            return res.json({
                success: true,
                message: "List Story successFully!",
                story: listStory
            })
        }
    }

    createStory = async (req, res) => {

        const userId = req.userId
        const { description, content } = req.body


        const formdata = {
            description,
            content,
            user: userId

        }
        const story = await hanleCreateStory(formdata, res)

        if (story) {
            return res.json({
                success: true,
                message: "Story created successfully!",
                story
            })
        }
    }

    deleteStory = async (req, res) => {
        const storyId = req.params.storyId
        const story = await hanleDeleteStory(storyId, res)
        if (story) {
            return res.json({
                success: true,
                message: "Story deleted successfully!",
                story
            })
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
                return res.json({
                    success: true,
                    message: 'Story updated successfully!',
                    story: storyUpdated
                })
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
                return res.json({
                    success: true,
                    message: 'Story updated successfully!',
                    story: storyUpdated
                })
            }
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
            return res.json({
                success: true,
                message: 'Story updated successfully!',
                story
            })
        }
    }
}

module.exports = new StoryController