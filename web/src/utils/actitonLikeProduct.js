import { useContext } from 'react'

import { LibraryContext } from '../store/contexts/libraryContext'
import { AlbumContext } from '../store/contexts/albumContext'
import { UserContext } from '../store/contexts/userContext'
import { PlaylistContext } from '../store/contexts/playlistContext'
import { SongContext } from '../store/contexts/songContext'

const LikeIcon = ({ type, idProduct, love }) => {

    const { likeAlbum, unlikeAlbum } = useContext(AlbumContext)
    const { likePlaylist, unlikePlaylist } = useContext(PlaylistContext)
    const { createLibrary, deleteLibrary } = useContext(LibraryContext)
    const { likeSong, unlikeSong } = useContext(SongContext)
    const { userState: { user } } = useContext(UserContext)

    const handleLikeProducts = async () => {
        if (user) {
            let fromData
            if (type === 'album') {
                await likeAlbum(idProduct)
                fromData = {
                    product: idProduct,
                    category: "ALBUM"
                }
            } else if (type === 'playlist') {
                await likePlaylist(idProduct)
                fromData = {
                    product: idProduct,
                    category: "PLAYLIST"
                }
            } else if (type === 'song') {
                await likeSong(idProduct)
                fromData = {
                    product: idProduct,
                    category: "SONG"
                }
            }
            await createLibrary(fromData)
        }
    }

    const handleUnlikeProduct = async () => {
        if (user) {
            if (type === 'album') {
                await unlikeAlbum(idProduct)
            } else if (type === 'playlist') {
                await unlikePlaylist(idProduct)
            } else if (type === 'song') {
                await unlikeSong(idProduct)
            }
            await deleteLibrary(idProduct)
        }
    }

    return (
        <>
            {love ? <i className="fas fa-heart heart like-item" onClick={handleUnlikeProduct} /> : <i className="far fa-heart" onClick={handleLikeProducts} />}
        </>
    )
}

export default LikeIcon