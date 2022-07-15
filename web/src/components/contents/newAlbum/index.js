import { useContext } from 'react'

import AlbumItem from '../staticComponents/album/AlbumItem'
import { AlbumContext } from '../../../store/contexts/albumContext'

const NewAlbum = () => {

    const { albumState } = useContext(AlbumContext)
    const { albums } = albumState

    return (
        <div className="mgt-20">
            <h2 className="title-box">Album</h2>
            <div className="playlist-item row">
                {albums.map((album, index) => {
                    const { name, avatar, author, _id } = album
                    return (
                        <div key={index} className="col-2 mgt-20">
                            <AlbumItem name={name} idAlbum={_id} avatar={avatar} author={author} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewAlbum