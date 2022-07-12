import { urlimg } from '../../../../../store/contexts/consts'
import LikeIcon from '../../../../../utils/actitonLikeProduct'

const SongItemZingChat = ({ song, index, nameAlbum }) => {


    let { _id, name, album } = song
    const { author, avatar } = album


    return (
        <div className="song pointer">
            <div className="song-leff">
                <h3>{index}</h3>
                <i className="fas fa-minus" />
                <div className="song-avatar">
                    <img src={`${urlimg}/${avatar}`} alt='' />
                    <div className="avatar-hover">
                        <i className="fas fa-play" />
                    </div>
                </div>
                <div className="song-name">
                    <span className="name">{name}</span>
                    <span>
                        {author.map((author, index) => {
                            return <a href key={index}>{author} </a>
                        })}
                    </span>
                </div>
            </div>
            <div className="song-right">
                <span>{nameAlbum && album.name}</span>
                <div className="right-actions">
                    <span className="time">02:55</span>
                </div>
            </div>
            <div className="hover-song">
                <LikeIcon type="song" idProduct={_id} />
                <i className="fas fa-microphone-alt" />
                <i className="fas fa-ellipsis-h" />
            </div>
        </div>
    )
}

export default SongItemZingChat