import SongItemZingChat from './SongItemZingChat'

const ListSongZingChat = ({ listSong }) => {

    return (
        <div className="list-song">
            {
                listSong.map((song, index) => {
                    return song && <SongItemZingChat key={index} nameAlbum index={index + 1} song={song} />
                })
            }
        </div>
    )
}

export default ListSongZingChat