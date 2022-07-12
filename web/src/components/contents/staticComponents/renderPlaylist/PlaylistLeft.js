import { useContext } from 'react'

import { urlimg } from '../../../../store/contexts/consts'
import { SongContext } from '../../../../store/contexts/songContext'

import LikeIcon from '../../../../utils/actitonLikeProduct'

const PlaylistLeft = ({ name, avatar, likes, author, updatedAt, album, user, id, userId }) => {

    const { setShowAddSongModal } = useContext(SongContext)

    const handleClickAddSong = () => {
        setShowAddSongModal(true)
    }


    const timeupDate = updatedAt.split('T')[0]
    const time = timeupDate.split('-')

    return (
        <div className="item-left">
            <div className="avart-playlist">
                <img src={`${urlimg}/${avatar}`} alt='' />
            </div>
            <div className="title-playlist">
                <h4 className="name">{name}</h4>
                <span className="time-update">Cập nhật: {`${time[2]}/${time[1]}/${time[0]}`}</span>
                <div className="list-auth-playlist">
                    <span>
                        {author.map((author, index) => {
                            return <a key={index} href={'/'}>{author} </a>
                        })}
                    </span>
                </div>
                <span>{likes} người yêu thích</span>
                <button className="btn-music-play">
                    <i className="fas fa-play" />
                    <span>TIẾP TỤC PHÁT</span>
                </button>
                {album && user === userId && <button onClick={handleClickAddSong} className="btn-music-play">
                    <i class="fas fa-plus"></i>
                    <span>Thêm Bài Hát</span>
                </button>
                }
                <div className="like-action">
                    {
                        album ? <LikeIcon type='album' idProduct={id} />
                            : <LikeIcon type='playlist' idProduct={id} />
                    }
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
        </div>
    )
}

export default PlaylistLeft