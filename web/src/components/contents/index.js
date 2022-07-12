import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { urlimg } from '../../store/contexts/consts'

import { UserContext } from '../../store/contexts/userContext'
import { AlbumContext } from '../../store/contexts/albumContext'
import { StoryContext } from '../../store/contexts/storyContext'
import Only from './only'
import Discover from './discover'
import RenderAlbum from './album'
import RenderPlaylist from './playlist'
import Radio from './radio'
import ZingChat from './zingchat'
import Category from './category'
import Follow from './follow'
import RenderAuthor from './author'
import AddPlaylistModal from '../form/AddPlaylistModal'
import AddAlbumModal from '../form/AddAlbumModal'
import AddSongModal from '../form/AddSongModal'
import AddStoryModal from '../form/AddStoryModal'
import AlbumLibarry from './only/AlbumLibarry'
import AuthorLibrary from './only/AuthorLibrary'
import PlaylistLibrary from './only/PlaylistLibrary'
import SongLibrary from './only/SongLibrary'


const Content = () => {

    const { userState: { user, isAuthenticated }, setShowLoginModal } = useContext(UserContext)
    const { setShowAddAlbumModal } = useContext(AlbumContext)
    const { setShowAddStoryModal } = useContext(StoryContext)


    let avatar = 'notavatar.png'
    if (user) {
        avatar = user.avatar
    }

    const handleClickAddAlbum = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
        }
        if (user) {
            setShowAddAlbumModal(true)
        }
    }

    const handleClickAddStory = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
        }
        if (user) {
            setShowAddStoryModal(true)
        }
    }


    return (
        <div className="content">
            <div className="content-header">
                <div className="header-body">
                    <div className="header-left">
                        <div className="header-actions">
                            <i className="fas fa-chevron-left" />
                            <i className="fas fa-chevron-right" />
                        </div>
                        <div className="header-seach">
                            <i className="fas fa-search" />
                            <input type="text" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..." />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="box-item header-right-topic" onClick={handleClickAddStory}>
                            <i className="fas fa-biohazard" />
                            <div className="note-hover">
                                <span>Đăng Story</span>
                            </div>
                        </div>
                        <div className="box-item header-right-upload" onClick={handleClickAddAlbum}>
                            <i className="fas fa-upload" />
                            <div className="note-hover">
                                <span>Thêm Mới Album</span>
                            </div>
                        </div>
                        <div className="box-item header-right-setings">
                            <i className="fas fa-cog" />
                        </div>
                        <div className="header-right-user">
                            <img alt='' src={`${urlimg}/${avatar}`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-body">
                <Routes>
                    <Route path='/mymusic' element={<Only />} >
                        <Route path='album' element={<AlbumLibarry />} />
                        <Route path='author' element={<AuthorLibrary />} />
                        <Route path='playlist' element={<PlaylistLibrary />} />
                        <Route path='song' element={<SongLibrary />} />
                    </Route>
                    <Route exact path='/zingchat' element={<ZingChat />} />
                    <Route exact path='/radio' element={<Radio />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/follow' element={<Follow />} />
                    <Route exact path='/album/:albumId' element={<RenderAlbum />} />
                    <Route exact path='/author/:flug' element={<RenderAuthor />} />
                    <Route exact path='/playlist/:playlistId' element={<RenderPlaylist />} />
                    <Route exact path='/' element={<Discover />} />
                </Routes>

            </div>
            <AddPlaylistModal />
            <AddAlbumModal />
            <AddSongModal />
            <AddStoryModal />
        </div>
    )
}

export default Content