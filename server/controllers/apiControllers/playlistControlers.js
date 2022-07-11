const PlaylistService = require('../services/playlistService')
const formidable = require('formidable')

const { hanleCreatePlaylist, handleGetAllPlaylist, handleGetOnePlaylist, hanleDeletePlaylist, handleUplikePlaylist, handleUpdatePlaylist } = PlaylistService


class PlaylistController {

    getPlaylist = async (req, res) => {
        const listPlaylist = await handleGetAllPlaylist(res)
        return res.json({
            success: true,
            message: "Playlist created successfully!",
            playlist: listPlaylist
        })
    }

    getOnePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await handleGetOnePlaylist({ _id: playlistId })
        if (playlist) {
            return res.json({
                success: true,
                message: "Playlist created successfully!",
                playlist
            })
        }
    }

    createPlaylist = async (req, res) => {
        const userId = req.userId
        const { name, description, author, avatar } = req.body

        const authorList = author.split(',')

        const formdata = {
            name,
            description,
            author: authorList,
            avatar,
            user: userId

        }
        const playlist = await hanleCreatePlaylist(formdata, res)

        if (playlist) {
            return res.json({
                success: true,
                message: "Playlist created successfully!",
                playlist
            })
        }
    }

    deletePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await hanleDeletePlaylist(playlistId, res)
        if (playlist) {
            return res.json({
                success: true,
                message: 'Playlist deleted successfully!',
                playlist
            })
        }
    }

    likePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await handleGetOnePlaylist({ _id: playlistId }, res)
        if (playlist) {
            const { likes } = playlist
            const newLikes = Number(likes) + 1
            const dataPlaylist = { likes: newLikes }
            const playlistUpdated = await handleUplikePlaylist(playlistId, dataPlaylist, res)
            if (playlistUpdated) {
                return res.json({
                    success: true,
                    message: "Update Playlist successfully!",
                    playlist: playlistUpdated
                })
            }
        }
    }

    unLikePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await handleGetOnePlaylist({ _id: playlistId }, res)
        if (playlist) {
            const { likes } = playlist
            const newLikes = Number(likes) - 1
            const dataPlaylist = { likes: newLikes }
            const playlistUpdated = await handleUplikePlaylist(playlistId, dataPlaylist, res)
            if (playlistUpdated) {
                return res.json({
                    success: true,
                    message: "Update Playlist successfully!",
                    playlist: playlistUpdated
                })
            }
        }
    }



    UpdatePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const avatar = req.file.originalname
        const { name, description, author } = req.body

        const authorList = author.split(',')

        const formdata = {
            name,
            description,
            author: authorList,
            avatar

        }

        const playlistUpdate = await handleUpdatePlaylist(playlistId, formdata, res)
        if (playlistUpdate) {
            return res.json({
                success: true,
                message: "Update Playlist successfully!",
                playlist: playlistUpdate
            })
        }
    }
}

module.exports = new PlaylistController