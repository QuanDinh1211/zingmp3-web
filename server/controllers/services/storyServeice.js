const Story = require('../../models/Story')
const handleDeleteStory = require('../../public/handleDeleteStoryFile')


class StoryService {
    hanleCreateStory = async (formdata, res) => {
        const { description, content, user } = formdata

        if (!description && !content) {
            return res.status(400).json({
                success: false,
                message: "missing story"
            })
        }
        try {


            const dataStory = {
                description,
                content,
                likes: '0',
                user
            }
            const story = new Story(dataStory)
            await story.save()
            return story
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetAllStory = async (res) => {
        try {
            const story = await Story.find({}).populate('user', ['name', 'avatar'])
            return story
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }


    handleGetOneStory = async (filter, res) => {
        try {
            const story = await Story.findOne(filter).populate('user', ['name'])
            if (!story) {
                return res.status(401).json({ success: false, message: 'story not found' })
            }
            return story

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    hanleDeleteStory = async (storyId, res) => {
        try {
            const deleteStory = await Story.findOneAndDelete({ _id: storyId })
            if (!deleteStory) {
                return res.status(401).json({ success: false, message: 'Story not found' })
            }
            handleDeleteStory(deleteStory.content)
            return deleteStory
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUplikeSong = async (songId, dataSong, res) => {
        if (!songId) {
            return res.status(401).json({ success: false, message: 'Song id not found' })
        }
        try {

            const songUpdate = await Story.findOneAndUpdate({ _id: songId }, dataSong, { new: true })
            if (!songUpdate) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }

            return songUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUpdateStory = async (storyId, formdata, res) => {
        const { description, content } = formdata

        if (!description && !content) {
            return res.status(400).json({
                success: false,
                message: "missing story"
            })
        }
        try {
            const story = await Story.findOne({ _id: storyId })
            const storyUpdate = await Story.findOneAndUpdate({ _id: storyId }, formdata, { new: true })
            if (!storyUpdate) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }
            if (content && content !== story.content) {
                handleDeleteStory(story.content)
            }
            return storyUpdate

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports = new StoryService