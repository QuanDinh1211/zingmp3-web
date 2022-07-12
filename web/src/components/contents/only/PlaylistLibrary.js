import { useContext } from 'react'
import { LibraryContext } from '../../../store/contexts/libraryContext'
import { PlaylistContext } from '../../../store/contexts/playlistContext'
import PlaylistItem from '../staticComponents/playlistItem/PlaylistItem'

const PlaylistLibrary = () => {
    const { libraryState: { playlists } } = useContext(LibraryContext)
    const { playlistState } = useContext(PlaylistContext)

    let listPlaylist = []

    playlistState.playlists.map(playlist => {
        if (playlists.includes(playlist._id)) {
            listPlaylist.push(playlist)
        }
        return null
    })
    return (
        <div className="playlist-item row">
            {listPlaylist.map((playlist, index) => {
                const { name, avatar, author, _id } = playlist
                if (index < 6) {
                    return (
                        <div key={index} className="col-2">
                            <PlaylistItem name={name} avatar={avatar} idPlaylist={_id} like author={author} />
                        </div>
                    )
                }

                return null

            })}
        </div>
    )
}

export default PlaylistLibrary