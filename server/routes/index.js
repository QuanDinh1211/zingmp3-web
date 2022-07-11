const userRowter = require('./User')
const albumRouter = require('./Alnum')
const playlistRouter = require('./Playlist')
const songRouter = require('./Song')
const storyRouter = require('./Story')

const apiUserRouter = require('./api/User')
const apiAlbumRouter = require('./api/Album')
const apiPlaylistRouter = require('./api/Playlist')
const apiSongRouter = require('./api/Song')
const apiStoryRouter = require('./api/Story')
const apiLibraryRouter = require('./api/Library')
const uploadRouter = require('./upload/formidable')

function route(app) {

    app.use('/user', userRowter)
    app.use('/api/user', apiUserRouter)
    app.use('/album', albumRouter)
    app.use('/api/album', apiAlbumRouter)
    app.use('/playlist', playlistRouter)
    app.use('/api/playlist', apiPlaylistRouter)
    app.use('/song', songRouter)
    app.use('/api/song', apiSongRouter)
    app.use('/story', storyRouter)
    app.use('/api/story', apiStoryRouter)
    app.use('/api/library', apiLibraryRouter)
    app.use('/api/upload', uploadRouter)
    app.get('/', (req, res) => {
        res.render('Home')
    })
}

module.exports = route;