import { urlimg } from '../../../../store/contexts/consts'
import { urlcontent } from '../../../../store/contexts/consts'
import { FollowUser, UnFollowUser } from '../../../../utils/actionFollowUser'



const StoryItem = ({ description, content, likes, user, createdAt, loveUser }) => {

    let { name, avatar } = user

    let format = content.split('.')[1]

    let body

    if (format === 'JPG' || format === 'png' || format === 'jpg') {
        body = <img src={`${urlcontent}/${content}`} alt="" />
    } else if (format === 'mp4') {
        body = (<video width="100%" height="100%" controls>
            <source src={`${urlcontent}/${content}`} type="video/mp4" />
        </video>)
    }


    const timeupDate = createdAt.split('T')[0]
    const time = timeupDate.split('-')

    return (
        <div className="post-item">
            <div className="post-header">
                <div className="user-time">
                    <div className="avar">
                        <img src={`${urlimg}/${avatar}`} alt='' />
                    </div>
                    <div className="name-time">
                        <div className="username">
                            <span className="name">{name}</span>
                            <span className="dot">.</span>
                            {loveUser ? <UnFollowUser id={user._id}>
                                <span className="flow pointer">UnFollow</span>
                            </UnFollowUser>
                                : <FollowUser id={user._id}>
                                    <span className="flow pointer">Follow</span>
                                </FollowUser>}
                        </div>
                        <span>{`${time[2]} tháng ${time[1]}`}</span>
                    </div>
                </div>
                <div className="post-description">
                    <span>
                        {description}
                    </span>
                </div>
            </div>
            <div className="post-body">
                {body}
            </div>
            <div className="body-footer">
                <div className="heat">
                    <i className="far fa-heart" />
                    <span>{likes}</span>
                </div>
                <div>
                    <i className="far fa-comment-dots" />
                    <span>0</span>
                </div>
            </div>
        </div>
    )
}

export default StoryItem