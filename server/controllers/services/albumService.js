const Album = require('../../models/Album')
const handleDeleteAvatar = require('../../public/handleDeleteFile')


class AlbumService {
    hanleCreateAlbum = async (formdata, res) => {
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



            const dataAlbum = {
                name,
                avatar,
                description,
                author,
                likes: '0',
                user
            }
            const album = new Album(dataAlbum)
            await album.save()
            return album
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetAllAlbum = async (res) => {
        try {
            const listAlbum = await Album.find({})
            return listAlbum
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }


    handleGetOneAlbum = async (filter, res) => {
        try {
            const album = await Album.findOne(filter)
            if (!album) {
                return res.status(401).json({ success: false, message: 'Album not found' })
            }
            return album

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    hanleDeleteAlbum = async (albumId, res) => {
        try {
            const deleteAlbum = await Album.findOneAndDelete({ _id: albumId })
            if (!deleteAlbum) {
                return res.status(401).json({ success: false, message: 'Album not found' })
            }
            handleDeleteAvatar(deleteAlbum.avatar)
            return deleteAlbum
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUplikeAlbum = async (albumId, dataAlbum, res) => {
        if (!albumId) {
            return res.status(401).json({ success: false, message: 'Album id not found' })
        }
        try {

            const albumUpdate = await Album.findOneAndUpdate({ _id: albumId }, dataAlbum, { new: true })
            if (!albumUpdate) {
                return res.status(401).json({ success: false, message: 'Album not found' })
            }

            return albumUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUpdateAlbum = async (albumId, dataAlbum, response) => {
        const { name, avatar, author } = dataAlbum

        if (!name || author.length === 0) {
            return res.status(400)
                .json({ success: false, message: 'Name or author is required' })
        }
        try {
            const album = await Album.findOne({ _id: albumId })
            const albumUpdate = await Album.findOneAndUpdate({ _id: albumId }, dataAlbum, { new: true })
            if (!albumUpdate) {
                return res.status(401).json({ success: false, message: 'Album not found' })
            }
            if (avatar && avatar !== album.avatar) {
                handleDeleteAvatar(album.avatar)
            }
            return albumUpdate

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports = new AlbumService