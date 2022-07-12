import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthorContext } from '../../../../store/contexts/authorContext'
import { urlimg } from '../../../../store/contexts/consts'
import { FollowUser, UnFollowUser } from '../../../../utils/actionFollowUser'


const UserItemCol = ({ name, followers, avatar, slug, id, love }) => {

    const { setAuthor } = useContext(AuthorContext)

    let navigate = useNavigate()


    const handleClickAuthorItem = async () => {
        const response = await setAuthor(slug)
        if (response.success) {
            navigate(`/author/${slug}`)
        }
    }

    return (
        <div className="user-item">
            <div className="avar-user">
                <img src={`${urlimg}/${avatar}`} alt="" />
                <div className="aver-hover">
                    <i className="fas fa-globe" onClick={handleClickAuthorItem}></i>
                </div>
            </div>
            <div className="user-title">

                <span className="name">{name}</span>

                <span className="flow-user">
                    {followers} follow
                </span>
                {love ? <UnFollowUser id={id}>
                    <button className="btn-follow-user">
                        <span>Hủy Theo Dõi</span>
                    </button>
                </UnFollowUser>
                    : <FollowUser id={id}>
                        <button className="btn-follow-user">
                            <span>Theo Dõi</span>
                        </button>
                    </FollowUser>}

            </div>
        </div>
    )
}

export default UserItemCol