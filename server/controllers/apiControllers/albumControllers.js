const AlbumService = require('../services/albumService')

const { hanleCreateAlbum, handleGetAllAlbum, handleGetOneAlbum, hanleDeleteAlbum, handleUplikeAlbum, handleUpdateAlbum } = AlbumService


class AlbumController {

    getAlbum = async (req, res) => {
        const listAlbum = await handleGetAllAlbum(res)
        return res.json({
            success: true,
            message: "List Album successfully!",
            album: listAlbum
        })
    }

    getOneAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const album = await handleGetOneAlbum({ _id: albumId }, res)
        if (album) {
            return res.json({
                success: true,
                message: "Get Album successfully!",
                album
            })
        }
    }

    createAlbum = async (req, res) => {
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

        const album = await hanleCreateAlbum(formdata, res)

        if (album) {
            return res.json({
                success: true,
                message: "Create Album successfully!",
                album
            })
        }
    }

    deleteAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const album = await hanleDeleteAlbum(albumId, res)
        if (album) {
            return res.json({
                success: true,
                message: 'Album deleted successfully',
                album
            })
        }
    }

    likeAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const album = await handleGetOneAlbum({ _id: albumId }, res)
        if (album) {
            const { likes } = album
            const newLikes = Number(likes) + 1
            const dataAlbum = { likes: newLikes }
            const albumUpdate = await handleUplikeAlbum(albumId, dataAlbum, res)
            if (albumUpdate) {
                return res.json({
                    success: true,
                    message: 'Album updated successfully!',
                    album: albumUpdate
                })
            }
        }
    }

    unLikeAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const album = await handleGetOneAlbum({ _id: albumId }, res)
        if (album) {
            const { likes } = album
            const newLikes = Number(likes) - 1
            const dataAlbum = { likes: newLikes }
            const albumUpdate = await handleUplikeAlbum(albumId, dataAlbum, res)
            if (albumUpdate) {
                return res.json({
                    success: true,
                    message: 'Album updated successfully!',
                    album: albumUpdate
                })
            }
        }
    }


    UpdateAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const avatar = req.file.originalname
        const { name, description, author } = req.body

        const authorList = author.split(',')

        const formdata = {
            name,
            description,
            author: authorList,
            avatar

        }

        const albumUpdate = await handleUpdateAlbum(albumId, formdata, res)
        if (albumUpdate) {
            return res.json({
                success: true,
                message: 'Album updated successfully!',
                album: albumUpdate
            })
        }
    }
}

module.exports = new AlbumController