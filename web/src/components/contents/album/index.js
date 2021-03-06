import { useContext } from 'react'

import { AlbumContext } from '../../../store/contexts/albumContext'
import { UserContext } from '../../../store/contexts/userContext'
import TableSong from '../staticComponents/tableSong'
import PlaylistLeft from '../staticComponents/renderPlaylist/PlaylistLeft'

const RenderAlbum = () => {

    const { albumState } = useContext(AlbumContext)

    const { userState } = useContext(UserContext)

    let userId
    if (userState.user) {
        userId = userState.user._id
    }

    const { album, songs } = albumState

    const { _id, name, avatar, description, likes, author, updatedAt, user } = album

    return (
        <div className="render-playlist-song">
            {
                album && <PlaylistLeft avatar={avatar} name={name} author={author} likes={likes} id={_id} updatedAt={updatedAt} album user={user} userId={userId} />
            }
            <div className="item-right">
                <div className="description-playlist-song">
                    <span>Lời tựa</span>
                    <i>{description}</i>
                </div>
                <TableSong songs={songs} />
            </div>
        </div>
    )
}

export default RenderAlbum