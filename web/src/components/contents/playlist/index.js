import { useContext } from 'react'

import { PlaylistContext } from '../../../store/contexts/playlistContext'
import { UserContext } from '../../../store/contexts/userContext'
import { LibraryContext } from '../../../store/contexts/libraryContext'
import TableSong from '../staticComponents/tableSong'
import PlaylistLeft from '../staticComponents/renderPlaylist/PlaylistLeft'

const RenderPlaylist = () => {

    const { playlistState } = useContext(PlaylistContext)

    const { userState } = useContext(UserContext)

    const { libraryState: { library } } = useContext(LibraryContext)

    let userId
    if (userState.user) {
        userId = userState.user._id
    }

    const { playlist, songs } = playlistState
    const { _id, name, avatar, description, likes, author, updatedAt, user } = playlist


    return (
        <div className="render-playlist-song">
            {
                library.includes(_id) ? <PlaylistLeft avatar={avatar} name={name} author={author} love likes={likes} id={_id} updatedAt={updatedAt} user={user} userId={userId} />
                    : <PlaylistLeft avatar={avatar} name={name} author={author} likes={likes} id={_id} updatedAt={updatedAt} user={user} userId={userId} />
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

export default RenderPlaylist