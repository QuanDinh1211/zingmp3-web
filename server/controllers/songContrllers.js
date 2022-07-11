const SongService = require('./services/songService')
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose')

const { hanleCreateSong, handleGetAllSong, handleGetOneSong, hanleDeleteSong, handleUplikeSong, handleUpdateSong } = SongService


class SongController {

    getSong = async (req, res) => {
        const listSong = await handleGetAllSong(res)
        res.render('Song/getListSong', { listSong: mutipleMongooseToObject(listSong) })
    }

    getCreateSong = async (req, res) => {
        res.render('Song/createSong')
    }
    createSong = async (req, res) => {

        const mp3 = req.file.originalname
        const userId = req.session.userId
        const { name } = req.body


        const formdata = {
            name,
            album: '625f136c54e80af6fec95c68',
            playlist: '625f13b1882141a8a7ab3b1c',
            mp3,
            user: userId

        }
        const song = await hanleCreateSong(formdata, res)

        if (song) {
            res.redirect('/song/getSong')
        }
    }

    deleteSong = async (req, res) => {
        const songId = req.params.songId
        const song = await hanleDeleteSong(songId, res)
        if (song) {
            res.redirect('/song/getSong')
        }
    }

    likeSong = async (req, res) => {
        const songId = req.params.songId
        const song = await handleGetOneSong({ _id: songId }, res)
        if (song) {
            const { views } = song[0]
            const newViews = Number(views) + 1
            const dataSong = { views: newViews }
            const songUpdated = await handleUplikeSong(songId, dataSong, res)
            if (songUpdated) {
                res.redirect('/song/getSong')
            }
        }
    }

    unLikeSong = async (req, res) => {
        const songId = req.params.songId
        const song = await handleGetOneSong({ _id: songId }, res)
        if (song) {
            const { views } = song[0]
            const newViews = Number(views) - 1
            const dataSong = { views: newViews }
            const songUpdated = await handleUplikeSong(songId, dataSong, res)
            if (songUpdated) {
                res.redirect('/song/getSong')
            }
        }
    }

    editSong = async (req, res) => {
        const songId = req.params.songId
        const song = await handleGetOneSong({ _id: songId }, res)
        if (song) {
            res.render('Song/editSong', { song: mutipleMongooseToObject(song) })
        }
    }

    UpdateSong = async (req, res) => {
        const songId = req.params.songId
        const mp3 = req.file.originalname
        const { name } = req.body


        const formdata = {
            name,
            mp3
        }

        const song = await handleUpdateSong(songId, formdata, res)
        if (song) {
            res.redirect('/song/getSong')
        }
    }
}

module.exports = new SongController