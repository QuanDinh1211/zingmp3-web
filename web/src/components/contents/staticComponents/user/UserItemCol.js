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
        <div class="user-item">
            <div class="avar-user">
                <img src={`${urlimg}/${avatar}`} alt="" />
                <div class="aver-hover">
                    <i class="fas fa-globe" onClick={handleClickAuthorItem}></i>
                </div>
            </div>
            <div class="user-title">

                <span class="name">{name}</span>

                <span class="flow-user">
                    {followers} follow
                </span>
                {love ? <UnFollowUser id={id}>
                    <button class="btn-follow-user">
                        <span>Hủy Theo Dõi</span>
                    </button>
                </UnFollowUser>
                    : <FollowUser id={id}>
                        <button class="btn-follow-user">
                            <span>Theo Dõi</span>
                        </button>
                    </FollowUser>}

            </div>
        </div>
    )
}

export default UserItemCol