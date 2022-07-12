import { useContext } from 'react'
import { NavLink, Outlet } from "react-router-dom"


import LoginModal from '../../form/Login'
import { UserContext } from '../../../store/contexts/userContext'

const Only = () => {

    const { userState: { isAuthenticated } } = useContext(UserContext)

    let body



    if (!isAuthenticated) {
        body = (<LoginModal />)
    } else {
        body = (
            <div className="library-wrapper-container">
                <div className="content-body-wrapper">
                    <div className="content-body-wrapper-title">
                        <h2>Thư viện</h2>
                        <i className="fas fa-play" />
                    </div>
                    <div className="content-body-container">
                        <div className="body-library">
                            <div className="library-tabs">
                                <NavLink
                                    to='song'
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <span className="tabs tab-song">BÀI HÁT</span>
                                </NavLink>
                                <NavLink
                                    to='playlist'
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <span className="tabs  tab-podcast">PLAYLIST</span>
                                </NavLink>
                                <NavLink
                                    to='album'
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <span className="tabs  tab-album">ALBUM</span>
                                </NavLink>
                                <NavLink
                                    to='author'
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <span className="tabs  tab-mv">CA SĨ</span>
                                </NavLink>
                            </div>
                            <div className="library-filter">
                                <span className="library-like">YÊU THÍCH</span>
                                <span className="library-upload">ĐÃ TẢI LÊN</span>
                            </div>
                            <div className="mgt-20">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {body}
        </>
    )
}

export default Only