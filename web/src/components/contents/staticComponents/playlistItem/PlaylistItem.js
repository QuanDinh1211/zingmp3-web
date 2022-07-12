import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { urlimg } from '../../../../store/contexts/consts'
import { PlaylistContext } from '../../../../store/contexts/playlistContext'
import LikeIcon from '../../../../utils/actitonLikeProduct'


const PlaylistItem = ({ name, avatar, author, idPlaylist }) => {

    let navigate = useNavigate()

    const { setPlaylist } = useContext(PlaylistContext)

    const handleClickPlaylistItem = async () => {

        const response = await setPlaylist(idPlaylist)
        if (response.success) {
            navigate(`/playlist/${idPlaylist}`)
        }
    }

    return (
        <div className="song-item">
            <div className="avatar">
                <img src={`${urlimg}/${avatar}`} alt='' />
                <div className="hover-avatar">
                    <LikeIcon type='playlist' idProduct={idPlaylist} />
                    <i className="play far fa-play-circle" onClick={handleClickPlaylistItem} />
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
            <div className="titlle">
                <span className="name">{name}</span>
                <span>
                    {author.map((author, index) => {
                        return <a href key={index}>{author}</a>
                    })}
                </span>

            </div>
        </div>
    )
}

export default PlaylistItem