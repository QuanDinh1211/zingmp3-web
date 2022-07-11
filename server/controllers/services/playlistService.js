const Playlist = require('../../models/Playlist')
const handleDeleteAvatar = require('../../public/handleDeleteFile')


class PlaylistService {
    hanleCreatePlaylist = async (formdata, res) => {
        const { name, avatar, description, author, user } = formdata

        if (!name || !avatar) {
            return res.status(400).json({
                success: false,
                message: "missing name or avatar"
            })
        }
        try {
            if (author.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "missing author"
                })
            }



            const dataPlaylist = {
                name,
                avatar,
                description,
                author,
                likes: '0',
                user
            }
            const playlist = new Playlist(dataPlaylist)
            await playlist.save()
            return playlist
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetAllPlaylist = async (res) => {
        try {
            const listPlaylist = await Playlist.find({})
            return listPlaylist
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }


    handleGetOnePlaylist = async (filter, res) => {
        try {
            const playlist = await Playlist.findOne(filter)
            if (!playlist) {
                return res.status(401).json({ success: false, message: 'Playlist not found' })
            }
            return playlist

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    hanleDeletePlaylist = async (playlistId, res) => {
        try {
            const deletePlaylist = await Playlist.findOneAndDelete({ _id: playlistId })
            if (!deletePlaylist) {
                return res.status(401).json({ success: false, message: 'Playlist not found' })
            }
            handleDeleteAvatar(deletePlaylist.avatar)
            return deletePlaylist
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUplikePlaylist = async (playlistId, dataPlaylist, res) => {
        if (!playlistId) {
            return res.status(401).json({ success: false, message: 'Album id not found' })
        }
        try {

            const playlistUpdate = await Playlist.findOneAndUpdate({ _id: playlistId }, dataPlaylist, { new: true })
            if (!playlistUpdate) {
                return res.status(401).json({ success: false, message: 'Album not found' })
            }

            return playlistUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUpdatePlaylist = async (playlistId, formdata, res) => {
        const { name, avatar, description, author } = formdata

        if (!name || author.length === 0) {
            return res.status(400)
                .json({ success: false, message: 'Name or author is required' })
        }
        try {
            const playlist = await Playlist.findOne({ _id: playlistId })
            const playlistUpdate = await Playlist.findOneAndUpdate({ _id: playlistId }, formdata, { new: true })
            if (!playlistUpdate) {
                return res.status(401).json({ success: false, message: 'Playlist not found' })
            }
            if (avatar && avatar !== playlist.avatar) {
                handleDeleteAvatar(playlist.avatar)
            }
            return playlistUpdate

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports = new PlaylistService