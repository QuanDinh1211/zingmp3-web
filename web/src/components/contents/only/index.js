import { useContext } from 'react'

import TableSong from '../staticComponents/tableSong'
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
                                <span className="tabs active tab-song">BÀI HÁT</span>
                                <span className="tabs  tab-podcast">PODCAST</span>
                                <span className="tabs  tab-album">ALBUM</span>
                                <span className="tabs  tab-mv">MV</span>
                            </div>
                            <div className="library-filter">
                                <span className="library-like">YÊU THÍCH</span>
                                <span className="library-upload">ĐÃ TẢI LÊN</span>
                            </div>
                            <TableSong />
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