const Song = require('../../models/Song')
const handleDeleteMp3 = require('../../public/handleDeleteMp3')


class SongService {
    hanleCreateSong = async (formdata, res) => {
        const { name, mp3, album, playlist, user } = formdata

        if (!name || !mp3) {
            return res.status(400).json({
                success: false,
                message: "missing name or avatar"
            })
        }
        try {


            const dataSong = {
                name,
                mp3,
                album,
                playlist,
                views: '0',
                user
            }
            const song = new Song(dataSong)
            await song.save()
            return song
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetAllSong = async (res) => {
        try {
            const listSong = await Song.find({}).populate('album', ['avatar', 'author', 'name'])
            return listSong
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }



    handleGetOneSong = async (filter, res) => {
        try {
            const song = await Song.find(filter).populate('album', ['avatar', 'author', 'name'])
            if (!song) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }
            return song

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    hanleDeleteSong = async (songId, res) => {
        try {
            const deleteSong = await Song.findOneAndDelete({ _id: songId })
            if (!deleteSong) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }
            handleDeleteMp3(deleteSong.mp3)
            return deleteSong
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

            const songUpdate = await Song.findOneAndUpdate({ _id: songId }, dataSong, { new: true })
            if (!songUpdate) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }

            return songUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUpdateSong = async (songId, formdata, res) => {
        const { name, mp3 } = formdata

        if (!name || !mp3) {
            return res.status(400)
                .json({ success: false, message: 'Name or mp3 is required' })
        }
        try {
            const song = await Song.findOne({ _id: songId })
            const songUpdate = await Song.findOneAndUpdate({ _id: songId }, formdata, { new: true })
            if (!songUpdate) {
                return res.status(401).json({ success: false, message: 'Song not found' })
            }
            if (mp3 && mp3 !== song.mp3) {
                handleDeleteMp3(song.mp3)
            }
            return songUpdate

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports = new SongService