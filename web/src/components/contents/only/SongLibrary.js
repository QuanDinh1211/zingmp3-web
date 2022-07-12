import { useContext } from 'react'

import { LibraryContext } from '../../../store/contexts/libraryContext'
import { SongContext } from '../../../store/contexts/songContext'
import TableSong from '../staticComponents/tableSong'


const SongLibrary = () => {
    const { libraryState: { songs } } = useContext(LibraryContext)
    const { songState } = useContext(SongContext)

    let listSong = []

    songState.songs.map(song => {
        if (songs.includes(song._id)) {
            listSong.push(song)
        }
        return null
    })


    return (
        <>
            <TableSong songs={listSong} />
        </>
    )
}

export default SongLibrary