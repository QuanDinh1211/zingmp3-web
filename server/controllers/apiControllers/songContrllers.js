const SongService = require('../services/songService')

const { hanleCreateSong, handleGetAllSong, handleGetOneSong, hanleDeleteSong, handleUplikeSong, handleUpdatePlaylistSong } = SongService


class SongController {

    getSong = async (req, res) => {
        const listSong = await handleGetAllSong(res)
        if (listSong) {
            return res.json({
                success: true,
                message: "Get listSong successfully!",
                song: listSong
            })
        }
    }

    getOneSong = async (req, res) => {
        const songId = req.params.songId
        const song = await handleGetOneSong({ _id: songId }, res)
        if (song) {
            return res.json({
                success: true,
                message: "Get oneSong successfully",
                song: song[0]
            })
        }
    }

    getSongAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const listSong = await handleGetOneSong({ album: albumId }, res)
        if (listSong) {
            return res.json({
                success: true,
                message: "Get listSong successfully!",
                song: listSong
            })
        }
    }

    getSongPlaylist = async (req, res) => {
        const playlistId = req.params.playlistId
        const listSong = await handleGetOneSong({ playlist: playlistId })
        if (listSong) {
            return res.json({
                success: true,
                message: "Get listSong successfully!",
                song: listSong
            })
        }
    }

    getSongName = async (req, res) => {
        const songName = req.params.songName
        const listSong = await handleGetOneSong({ 'name': new RegExp(songName, 'i') })
        if (listSong) {
            return res.json({
                success: true,
                message: "Get listSong successfully!",
                song: listSong
            })
        }
    }

    createSong = async (req, res) => {

        const userId = req.userId
        const { name, playlist, album, mp3 } = req.body


        const formdata = {
            name,
            album,
            playlist,
            mp3,
            user: userId

        }
        const song = await hanleCreateSong(formdata, res)

        if (song) {
            return res.json({
                success: true,
                message: "Create Song successfully!",
                song
            })
        }
    }

    deleteSong = async (req, res) => {
        const songId = req.params.songId
        const song = await hanleDeleteSong(songId, res)
        if (song) {
            return res.json({
                success: true,
                message: "Song deleted successfully!",
                song
            })
        }
    }

    likeSong = async (req, res) => {
        const songId = req.params.songId
        const song = await handleGetOneSong({ _id: songId }, res)
        if (song) {
            const { views } = song[0]
            const newViews = Number(views) + 1
            console.log(newViews);
            const dataSong = { views: newViews }
            const songUpdated = await handleUplikeSong(songId, dataSong, res)
            if (songUpdated) {
                return res.json({
                    success: true,
                    message: "Song updated successfully!",
                    song: songUpdated
                })
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
                return res.json({
                    success: true,
                    message: "Song updated successfully!",
                    song: songUpdated
                })
            }
        }
    }


    UpdateSongApi = async (req, res) => {
        const songId = req.params.songId
        const { playlist } = req.body


        const formdata = {
            playlist
        }

        const song = await handleUpdatePlaylistSong(songId, formdata, res)
        if (song) {
            return res.json({
                success: true,
                message: "Song updated successfully!",
                song
            })
        }
    }
}

module.exports = new SongController