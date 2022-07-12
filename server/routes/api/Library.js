const express = require('express')
const router = express.Router()

const LibraryController = require('../../controllers/apiControllers/libraryController')
const verifyTocken = require('../../middleware/verifyTocken')

const { createLibrary, getLibrary, getLibraryAlbum, getLibraryPlaylist, getLibrarySong, getLibraryAuthor, deleteLibrary, getLibraryStory } = LibraryController

router.get('/getLibrary/album', verifyTocken, getLibraryAlbum)
router.get('/getLibrary/playlist', verifyTocken, getLibraryPlaylist)
router.get('/getLibrary/song', verifyTocken, getLibrarySong)
router.get('/getLibrary/author', verifyTocken, getLibraryAuthor)
router.get('/getLibrary/story', verifyTocken, getLibraryStory)
router.get('/getLibrary', verifyTocken, getLibrary)
router.post('/createLibrary', verifyTocken, createLibrary)
router.delete('/:productId', verifyTocken, deleteLibrary)


module.exports = router