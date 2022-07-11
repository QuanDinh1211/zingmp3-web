import { useContext } from 'react'

import { SongContext } from '../../../../store/contexts/songContext'
import { urlimg } from '../../../../store/contexts/consts'
import LikeIcon from '../../../../utils/actitonLikeProduct'

const SongItem = ({ id, name, avatar, author, nameAlbum, love }) => {

    const { getOneSong } = useContext(SongContext)

    const handleCilckPlaySong = async () => {
        await getOneSong(id)

    }
    return (
        <tr>
            <td className="song-name">
                <i className="fas fa-music" />
                <div className="avart-song">
                    <img src={`${urlimg}/${avatar}`} alt='' />
                    <div className="avart-hover">
                        <i className="fas fa-play" onClick={handleCilckPlaySong} />
                    </div>
                </div>
                <div>
                    <span className="name">{name}</span>
                    <span>
                        {author.map((author, index) => {
                            return <a href key={index}>{author} </a>
                        })}
                    </span>

                </div>
            </td>
            <td className="song-album"><span>{nameAlbum}</span></td>
            <td className="song-actions">
                <div className="status-song">
                    <div className="mic-song">
                        <i className="fas fa-microphone" />
                    </div>
                    <div className="heart-time">
                        {/* <i className="fas fa-heart heart" /> */}
                        <LikeIcon type='song' idProduct={id} love={love} />
                        <div className="time-song">
                            <span>05:03</span>
                            <i className="dot fas fa-ellipsis-h" />
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default SongItem