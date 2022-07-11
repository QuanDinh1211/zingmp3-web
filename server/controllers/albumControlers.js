const AlbumService = require('./services/albumService')
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose')

const { hanleCreateAlbum, handleGetAllAlbum, handleGetOneAlbum, hanleDeleteAlbum, handleUplikeAlbum, handleUpdateAlbum } = AlbumService


class AlbumController {

    getAlbum = async (req, res) => {
        const listAlbum = await handleGetAllAlbum(res)
        res.render('Album/GetListAlbum', { listAlbum: mutipleMongooseToObject(listAlbum) })
    }

    getCreateAlbum = async (req, res) => {
        res.render('Album/CreateAlbum')
    }
    createAlbum = async (req, res) => {
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
        const album = await hanleCreateAlbum(formdata, res)

        if (album) {
            res.redirect('/album/getAlbum')
        }
    }

    deleteAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const album = await hanleDeleteAlbum(albumId, res)
        if (album) {
            res.redirect('/album/getAlbum')
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
                res.redirect('/album/getAlbum')
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
                res.redirect('/album/getAlbum')
            }
        }
    }

    editAlbum = async (req, res) => {
        const albumId = req.params.albumId
        const albumEdit = await handleGetOneAlbum({ _id: albumId }, res)
        if (albumEdit) {
            res.render('Album/editAlum', { albumEdit: mongooseToObject(albumEdit) })
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
            res.redirect('/album/getAlbum')
        }
    }
}

module.exports = new AlbumController