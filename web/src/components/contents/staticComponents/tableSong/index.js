import { useContext } from 'react'

import { LibraryContext } from '../../../../store/contexts/libraryContext'
import SongItem from './SongItem'

const TableSong = ({ songs }) => {

    const { libraryState: { library } } = useContext(LibraryContext)

    return (
        <table className="table table-body">
            <thead>
                <tr>
                    <th>BÀI HÁT</th>
                    <th>ALBUM</th>
                    <th className="time"><span /> <span>THỜI GIAN</span></th>
                </tr>
            </thead>
            <tbody>
                {songs && songs.map((song, index) => {
                    const { _id, name, album } = song
                    const { author, avatar } = album
                    if (library.includes(_id)) {
                        return <SongItem key={index} id={_id} love name={name} author={author} avatar={avatar} nameAlbum={album.name} />
                    }
                    return <SongItem key={index} id={_id} name={name} author={author} avatar={avatar} nameAlbum={album.name} />
                })}
            </tbody>
        </table>
    )
}

export default TableSong