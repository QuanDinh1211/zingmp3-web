import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { urlimg } from '../../../../store/contexts/consts'
import { AlbumContext } from '../../../../store/contexts/albumContext'
import LikeIcon from '../../../../utils/actitonLikeProduct'
import AuthorProuctItem from '../user/AuthorProuctItem'

const AlbumItem = ({ name, avatar, author, idAlbum }) => {

    const { setAlbum } = useContext(AlbumContext)

    let navigate = useNavigate()

    const handleClickAlbumItem = async () => {

        const response = await setAlbum(idAlbum)
        if (response.success) {
            navigate(`/album/${idAlbum}`)
        }
    }

    return (
        <div className="song-item">
            <div className="avatar">
                <img src={`${urlimg}/${avatar}`} alt='' />
                <div className="hover-avatar">
                    <LikeIcon type='album' idProduct={idAlbum} />
                    <i className="play far fa-play-circle" onClick={handleClickAlbumItem} />
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
            <div className="titlle">
                <span className="name">{name}</span>
                <span>
                    {author.map((author, index) => {
                        return <AuthorProuctItem key={index} author={author} />
                    })}
                </span>

            </div>
        </div>
    )
}

export default AlbumItem