import { useContext } from 'react'
import { UserContext } from '../../store/contexts/userContext'
import { PlaylistContext } from '../../store/contexts/playlistContext'

import MenuItem from './MenuItem'

const Menu = () => {

    const listMenuItem = {
        myMusic: {
            path: 'mymusic/song',
            classItem: 'item-personal',
            classIcon: 'far fa-user',
            nameItem: 'Cá nhân'
        },
        discover: {
            path: '/',
            classItem: 'item-discover',
            classIcon: 'far fa-dot-circle',
            nameItem: 'Khám phá'
        },
        zingchat: {
            path: 'zingchat',
            classItem: 'item-zingchat',
            classIcon: 'fab fa-creative-commons-sampling',
            nameItem: '#zingchat'
        },
        radio: {
            path: 'radio',
            classItem: 'item-radio',
            classIcon: 'fas fa-blog',
            nameItem: 'Radio'
        },
        follow: {
            path: 'follow',
            classItem: 'item-follow',
            classIcon: 'far fa-newspaper',
            nameItem: 'Theo dõi'
        },

    }

    const { userState: { isAuthenticated }, setShowLoginModal } = useContext(UserContext)
    const { setShowAddPlaylistModal } = useContext(PlaylistContext)

    const handleClickMyMusic = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
        }
    }


    const listContentItem = {
        newMusic: {
            path: 'newmusic',
            classItem: 'item-music-new',
            classIcon: 'fas fa-music',
            nameItem: 'Nhạc mới'
        },
        category: {
            path: 'category',
            classItem: 'item-category',
            classIcon: 'fas fa-shapes',
            nameItem: 'Thể loại'
        },
        topik: {
            path: 'topik',
            classItem: 'item-star',
            classIcon: 'far fa-star',
            nameItem: 'Top 100'
        },
        mv: {
            path: 'mv',
            classItem: 'item-mv',
            classIcon: 'fas fa-tv',
            nameItem: 'MV'
        },
    }

    const listLibraryItems = {
        myMusicSong: {
            path: 'mymusic/song',
            classItem: 'item-song',
            classIcon: 'fas fa-headphones-alt',
            nameItem: 'Bài hát'
        },
        myMusicPlaylist: {
            path: 'mymusic/playlist',
            classItem: 'item-playlist',
            classIcon: 'fas fa-layer-group',
            nameItem: 'Playlist'
        },
        myMusicAlbym: {
            path: 'mymusic/album',
            classItem: 'item-album',
            classIcon: 'fas fa-compact-disc',
            nameItem: 'Album'
        },
        myMusicAuthor: {
            path: 'mymusic/author',
            classItem: 'item-album',
            classIcon: 'fas fa-user-check',
            nameItem: 'Ca sĩ'
        },
    }

    const handleClicAddPlaylist = () => {
        if (!isAuthenticated) {
            return setShowLoginModal(true)
        }
        setShowAddPlaylistModal(true)
    }

    return (
        <div className="menu">
            <div className="menu-header">
                <div className="logo">
                    <img alt='' src={require("../../acsess/img/logo.png")} />
                </div>
                <div className="menu-list-items">
                    <MenuItem classItem='item-personal' path='mymusic/song' classIcon='far fa-user' nameItem='Cá nhân' onClick={handleClickMyMusic} />
                    {Object.values(listMenuItem).map((menuItem, index) => {
                        const { path, classItem, classIcon, nameItem } = menuItem
                        return index !== 0 && <MenuItem classItem={classItem} key={index} path={path} classIcon={classIcon} nameItem={nameItem} />
                    })}
                </div>
            </div>
            <div className="menu-content">
                <div className="content-gadient"></div>
                <div className="content-items">
                    {Object.values(listContentItem).map((menuItem, index) => {
                        const { path, classItem, classIcon, nameItem } = menuItem
                        return <MenuItem classItem={classItem} key={index} path={path} classIcon={classIcon} nameItem={nameItem} />
                    })}


                    <div className="content-library">
                        <div className="library-title">
                            <span>Thư viện</span>
                            <i className="fas fa-pen"></i>
                        </div>
                        {Object.values(listLibraryItems).map((menuItem, index) => {
                            const { path, classItem, classIcon, nameItem } = menuItem
                            return <MenuItem classItem={classItem} key={index} path={path} classIcon={classIcon} nameItem={nameItem} />
                        })}
                    </div>
                </div>

            </div>
            <button className="menu-button-add-playlist" onClick={handleClicAddPlaylist}>
                <i className="fas fa-plus"></i>
                <span> Tạo playlist mới</span>
            </button>
        </div>
    )
}

export default Menu