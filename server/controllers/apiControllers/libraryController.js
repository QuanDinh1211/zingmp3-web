const LibraryService = require('../services/libraryService')

const { hanleCreateLibrary, handleGetListLibrary, hanleDeleteLibrary } = LibraryService


class LibraryController {

    getLibrary = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }

    getLibraryAlbum = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId, category: 'ALBUM' }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }

    getLibraryPlaylist = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId, category: 'PLAYLIST' }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }

    getLibrarySong = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId, category: 'SONG' }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }

    getLibraryAuthor = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId, category: 'USER' }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }

    getLibraryStory = async (req, res) => {
        const listLibrary = await handleGetListLibrary({ user: req.userId, category: 'STORY' }, res)
        return res.json({
            success: true,
            message: "List library successfully!",
            library: listLibrary
        })
    }


    createLibrary = async (req, res) => {
        const userId = req.userId
        const { product, category } = req.body

        const data = {
            product,
            category,
            user: userId

        }

        const library = await hanleCreateLibrary(data, res)
        if (library) {
            return res.json({
                success: true,
                message: "Create library successfully!",
                library
            })
        }
    }

    deleteLibrary = async (req, res) => {
        const productId = req.params.productId
        const library = await hanleDeleteLibrary({ user: req.userId, product: productId }, res)
        if (library) {
            return res.json({
                success: true,
                message: 'library deleted successfully',
                library
            })
        }
    }


}

module.exports = new LibraryController