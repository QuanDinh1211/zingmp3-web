import { useContext } from 'react'
import { SongContext } from '../../../../store/contexts/songContext'
import SongItem from '../tableSong/SongItem'

const RenderSeach = ({ name }) => {
    const { songState: { songs } } = useContext(SongContext)
    const listSong = []
    songs.map(song => {
        if (name && song.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
            listSong.push(song)
        }
        return null
    })
    return (
        <div className="render-seach">
            <table className="table table-body">
                <tbody>
                    {listSong && listSong.map((song, index) => {
                        const { _id, name, album } = song
                        const { author, avatar } = album
                        return <SongItem key={index} id={_id} name={name} author={author} avatar={avatar} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RenderSeach
