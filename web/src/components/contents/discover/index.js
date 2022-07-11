import { useContext } from 'react'
import { PlaylistContext } from '../../../store/contexts/playlistContext'
import { AlbumContext } from '../../../store/contexts/albumContext'
import { LibraryContext } from '../../../store/contexts/libraryContext'


import Slide from "../staticComponents/slideContents"
import PlaylistItem from '../staticComponents/playlistItem/PlaylistItem'
import AlbumItem from '../staticComponents/album/AlbumItem'
import ListUserRow from '../staticComponents/user/ListUserRow'

const Discover = () => {

    const { playlistState } = useContext(PlaylistContext)
    const { albumState } = useContext(AlbumContext)
    const { libraryState: { library } } = useContext(LibraryContext)

    const { playlists } = playlistState
    const { albums } = albumState

    return (
        <div className="discover-wrapper">
            <Slide />
            <div className="discover-item">
                <h2 className="title-box">Gần đây</h2>
                <div className="playlist-item row">
                    {playlists.map((playlist, index) => {
                        const { name, avatar, author, _id } = playlist
                        if (index < 6) {
                            if (library.includes(_id)) {
                                return (
                                    <div key={index} className="col-2">
                                        <PlaylistItem name={name} avatar={avatar} idPlaylist={_id} like author={author} />
                                    </div>
                                )
                            }
                            return (
                                <div key={index} className="col-2">
                                    <PlaylistItem name={name} avatar={avatar} idPlaylist={_id} author={author} />
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </div>

            <div className="mgt-200">
                <h2 className="title-box">Ban có thể thích</h2>
                <ListUserRow />
            </div>

            <div className="mgt-20">
                <h2 className="title-box">Album</h2>
                <div className="playlist-item row">
                    {albums.map((playlist, index) => {
                        const { name, avatar, author, _id } = playlist
                        if (index < 6) {
                            if (library.includes(_id)) {
                                return (
                                    <div key={index} className="col-2">
                                        <AlbumItem name={name} idAlbum={_id} avatar={avatar} like author={author} />
                                    </div>
                                )
                            }
                            return (
                                <div key={index} className="col-2">
                                    <AlbumItem name={name} idAlbum={_id} avatar={avatar} author={author} />
                                </div>
                            )
                        }

                        return null

                    })}
                </div>
            </div>

        </div>
    )
}

export default Discover