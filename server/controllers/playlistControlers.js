const PlaylistService = require('./services/playlistService')
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose')

const { hanleCreatePlaylist, handleGetAllPlaylist, handleGetOnePlaylist, hanleDeletePlaylist, handleUplikePlaylist, handleUpdatePlaylist } = PlaylistService


class PlaylistController {

    getPlaylist = async (req, res) => {
        const listPlaylist = await handleGetAllPlaylist(res)
        res.render('Playlist/GetListPlaylist', { listPlaylist: mutipleMongooseToObject(listPlaylist) })
    }

    getCreatePlaylist = async (req, res) => {
        res.render('Playlist/CreatePlaylist')
    }
    createPlaylist = async (req, res) => {
        const avatar = req.file.originalname
        const userId = req.session.userId
        const { name, description, author } = req.body

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
            res.redirect('/playlist/getPlaylist')
        }
    }

    deletePlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await hanleDeletePlaylist(playlistId, res)
        if (playlist) {
            res.redirect('/playlist/getPlaylist')
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
                res.redirect('/playlist/getPlaylist')
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
                res.redirect('/playlist/getPlaylist')
            }
        }
    }

    editPlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const playlist = await handleGetOnePlaylist({ _id: playlistId }, res)
        if (playlist) {
            res.render('Playlist/editPlaylist', { playlist: mongooseToObject(playlist) })
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
            res.redirect('/playlist/getPlaylist')
        }
    }
}

module.exports = new PlaylistController