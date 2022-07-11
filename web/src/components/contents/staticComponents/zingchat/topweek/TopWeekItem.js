import SongItemZingChat from '../listSong/SongItemZingChat'

const TopWeekItem = () => {
    return (
        <div className="item-top">
            <div className="top-title">
                <h2>Việt Nam</h2>
                <i className="fas fa-play" />
            </div>
            <div className="list-song">
                <SongItemZingChat />
                <SongItemZingChat />
                <SongItemZingChat />
                <SongItemZingChat />
                <SongItemZingChat />
                <div className="show-all-topic">
                    <button type="button" className="btn-show-topic">Xem tất cả</button>
                </div>
            </div>
        </div>
    )
}

export default TopWeekItem