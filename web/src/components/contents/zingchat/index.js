import ListSongZingChat from '../staticComponents/zingchat/listSong'
import Topweek from '../staticComponents/zingchat/topweek'

const ZingChat = () => {
    return (
        <div className="zingchat-wrapper">
            <div className="content-body-wrapper-title">
                <h2>#ZingChat</h2>
                <i className="fas fa-play" />
            </div>
            <ListSongZingChat />
            <div className="tops-week">
                <div className="content-body-wrapper-title">
                    <h2>Bảng Xếp Hạng Tuần</h2>
                </div>
                <Topweek />
            </div>
        </div>
    )
}

export default ZingChat