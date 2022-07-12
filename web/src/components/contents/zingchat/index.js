import { useContext, useState } from 'react'

import { SongContext } from '../../../store/contexts/songContext'
import ListSongZingChat from '../staticComponents/zingchat/listSong'
// import Topweek from '../staticComponents/zingchat/topweek'

const ZingChat = () => {

    const { songState: { songs } } = useContext(SongContext)

    const [showTop100, setShowTop100] = useState(false)

    const handleClickButtonShowTop100 = () => {
        setShowTop100(!showTop100)
    }

    let listSongTop = []

    songs.map((song, index) => {
        if (showTop100) {
            if (index < 100) {
                return listSongTop.push(song)
            }
        }
        if (index < 10) {
            return listSongTop.push(song)
        }
        return null
    })

    return (
        <div className="zingchat-wrapper">
            <div className="content-body-wrapper-title">
                <h2>#ZingChat</h2>
                <i className="fas fa-play" />
            </div>
            <ListSongZingChat listSong={listSongTop} />
            <div className="show-all-topic" onClick={handleClickButtonShowTop100}>
                <button type="button" className="btn-show-topic">{showTop100 ? 'Ẩn' : 'Xem top 100'}</button>
            </div>
            {/* <div className="tops-week">
                <div className="content-body-wrapper-title">
                    <h2>Bảng Xếp Hạng Tuần</h2>
                </div>
                <Topweek />
            </div> */}
        </div>
    )
}

export default ZingChat