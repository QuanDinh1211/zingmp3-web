import { useContext } from 'react'

import { LibraryContext } from '../../../store/contexts/libraryContext'
import { AlbumContext } from '../../../store/contexts/albumContext'
import AlbumItem from '../staticComponents/album/AlbumItem'

const AlbumLibarry = () => {
    const { libraryState: { albums } } = useContext(LibraryContext)
    const { albumState } = useContext(AlbumContext)

    let listAlbum = []

    albumState.albums.map(album => {
        if (albums.includes(album._id)) {
            listAlbum.push(album)
        }
        return null
    })

    return (
        <div className="playlist-item row">
            {listAlbum.map((album, index) => {
                const { name, avatar, author, _id } = album
                if (index < 6) {
                    return (
                        <div key={index} className="col-2">
                            <AlbumItem name={name} idAlbum={_id} avatar={avatar} like author={author} />
                        </div>
                    )
                }

                return null

            })}
        </div>
    )
}

export default AlbumLibarry