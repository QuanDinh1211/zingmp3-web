import { useContext, useState } from 'react'

import { SongContext } from '../../../../store/contexts/songContext'
import { PlaylistContext } from '../../../../store/contexts/playlistContext'
import { urlimg } from '../../../../store/contexts/consts'
import { seachName } from '../../../../utils/seachAction'
import LikeIcon from '../../../../utils/actitonLikeProduct'

const SongItem = ({ id, name, avatar, author, nameAlbum }) => {

    const { getOneSong, updatePlaylistSong } = useContext(SongContext)
    const { playlistState: { playlists } } = useContext(PlaylistContext)

    const handleCilckPlaySong = async () => {
        await getOneSong(id)

    }


    const [actionDot, setActionDot] = useState({
        showAddPlaylist: false,
        showSearchPlaylist: false,
        searchName: ''
    })

    const { showAddPlaylist, showSearchPlaylist, searchName } = actionDot

    const handleClickDot = () => {
        setActionDot({
            ...actionDot,
            showAddPlaylist: !showAddPlaylist
        })
    }

    const handleClickAddPlylist = () => {
        setActionDot({
            ...actionDot,
            showSearchPlaylist: !showSearchPlaylist
        })
    }

    const handleOnChangeInputSearch = (event) => {
        setActionDot({
            ...actionDot,
            searchName: event.target.value,
        })
    }

    const listPlaylist = seachName(playlists, searchName)


    const RenderSeachPlaylistComponent = ({ idPlaylist, name }) => {
        const handleClickAddPlaylistSong = () => {
            setActionDot({
                ...actionDot,
                showSearchPlaylist: !showSearchPlaylist
            })
            updatePlaylistSong(id, {
                playlist: idPlaylist
            })
        }
        return <div className='render-addplaylist' onClick={handleClickAddPlaylistSong}>
            <p>{name}</p>
        </div>
    }


    return (
        <tr>
            <td className="song-name">
                <i className="fas fa-music" />
                <div className="avart-song">
                    <img src={`${urlimg}/${avatar}`} alt='' />
                    <div className="avart-hover">
                        <i className="fas fa-play" onClick={handleCilckPlaySong} />
                    </div>
                </div>
                <div>
                    <span className="name">{name}</span>
                    <span>
                        {author.map((author, index) => {
                            return <a href key={index}>{author} </a>
                        })}
                    </span>

                </div>
            </td>
            <td className="song-album"><span>{nameAlbum}</span></td>
            <td className="song-actions">
                <div className="status-song">
                    <div className="mic-song">
                        <i className="fas fa-microphone" />
                    </div>
                    <div className="heart-time">
                        <LikeIcon type='song' idProduct={id} />
                        <div className="time-song">
                            <span>05:03</span>
                            <i className="dot fas fa-ellipsis-h" onClick={handleClickDot} />
                            {showAddPlaylist &&
                                <div className='affter-dot-song'>
                                    <div className='affter-item-addplaylist' onClick={handleClickAddPlylist}>
                                        <p>Thêm vào Playlist</p>
                                    </div>
                                    {showSearchPlaylist &&
                                        <div className='affter-search-playlist'>
                                            <div className='affter-input'>
                                                <input type='text' onChange={handleOnChangeInputSearch} value={searchName} className='input' placeholder='Search' />
                                            </div>
                                            {listPlaylist && listPlaylist.map((playlist, index) => {
                                                return (
                                                    <RenderSeachPlaylistComponent key={index} idPlaylist={playlist._id} name={playlist.name} />
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default SongItem