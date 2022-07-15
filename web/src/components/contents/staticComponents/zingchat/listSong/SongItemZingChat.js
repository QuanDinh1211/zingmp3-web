import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


import { urlimg } from '../../../../../store/contexts/consts'
import LikeIcon from '../../../../../utils/actitonLikeProduct'
import { SongContext } from '../../../../../store/contexts/songContext'
import { seachName } from '../../../../../utils/seachAction'
import { PlaylistContext } from '../../../../../store/contexts/playlistContext'
import { AlbumContext } from '../../../../../store/contexts/albumContext'
import AuthorProuctItem from '../../user/AuthorProuctItem'

const SongItemZingChat = ({ song, index, nameAlbum }) => {

    const { getOneSong, updatePlaylistSong } = useContext(SongContext)
    const { playlistState: { playlists } } = useContext(PlaylistContext)

    const { setAlbum } = useContext(AlbumContext)

    let navigate = useNavigate()


    let { _id, name, album } = song
    const { author, avatar } = album

    const handleCilckPlaySong = async () => {
        await getOneSong(_id)

    }

    const handleOnclickNameAlbum = async () => {
        let result = await setAlbum(album._id)
        if (result.success) {
            navigate(`/album/${album._id}`, { replace: true })
        }
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
            updatePlaylistSong(_id, {
                playlist: idPlaylist
            })
        }
        return <div className='render-addplaylist' onClick={handleClickAddPlaylistSong}>
            <p>{name}</p>
        </div>
    }

    return (
        <div className="song pointer">
            <div className="song-leff">
                <h3>{index}</h3>
                <i className="fas fa-minus" />
                <div className="song-avatar">
                    <img src={`${urlimg}/${avatar}`} alt='' />
                    <div className="avatar-hover">
                        <i className="fas fa-play" onClick={handleCilckPlaySong} />
                    </div>
                </div>
                <div className="song-name">
                    <span className="name">{name}</span>
                    <span>
                        {author.map((author, index) => {
                            return <AuthorProuctItem key={index} author={author} />
                        })}
                    </span>
                </div>
            </div>
            <div className="song-right">
                <span onClick={handleOnclickNameAlbum}>{nameAlbum && <Link to>{album.name}</Link>}</span>
                <div className="right-actions">
                    <span className="time">02:55</span>
                </div>
            </div>
            <div className="hover-song">
                <LikeIcon type="song" idProduct={_id} />
                <i className="fas fa-microphone-alt" />
                <i className="fas fa-ellipsis-h" onClick={handleClickDot} />
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
    )
}

export default SongItemZingChat