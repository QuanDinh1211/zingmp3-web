import { useContext } from 'react'

import { PlaylistContext } from '../../../store/contexts/playlistContext'
import PlaylistItem from '../staticComponents/playlistItem/PlaylistItem'

const NewPlaylist = () => {

    const { playlistState } = useContext(PlaylistContext)
    const { playlists } = playlistState

    return (
        <div className="mgt-20">
            <h2 className="title-box">Gần đây</h2>
            <div className="playlist-item row">
                {playlists.map((playlist, index) => {
                    const { name, avatar, author, _id } = playlist
                    return (
                        <div key={index} className="col-2 mgt-20">
                            <PlaylistItem name={name} avatar={avatar} idPlaylist={_id} author={author} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewPlaylist