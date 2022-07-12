import { useContext } from 'react'


import { SongContext } from '../../../store/contexts/songContext'
import ListSongZingChat from '../staticComponents/zingchat/listSong'

const Topik = () => {
    const { songState: { songs } } = useContext(SongContext)
    let listSongTop100 = []
    songs.map((song, index) => {
        if (index < 100) {
            listSongTop100.push(song)
        }
        return null
    })
    return (
        <div className="zingchat-wrapper">
            <div className="content-body-wrapper-title">
                <h2>Top 100</h2>
                <i className="fas fa-play" />
            </div>
            <ListSongZingChat listSong={listSongTop100} />

        </div>
    )
}

export default Topik