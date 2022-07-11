import { urlimg } from '../../../../store/contexts/consts'
import { FollowUser, UnFollowUser } from '../../../../utils/actionFollowUser'


const RenderFirtAuthor = ({ name, description, avatar, followers, love, id }) => {
    return (
        <div className="athor-first-body">
            <div className="first-athor-left">
                <h3>{name}</h3>
                <div className="author-follow">
                    <span><i>follow:</i> {followers}</span>
                </div>
                <div className="athor-description">
                    <span>{description}</span>
                </div>
                <div className="athor-action">

                    {love ? <UnFollowUser id={id}>
                        <div className="button-follow pointer">
                            <span>Hủy Theo Dõi</span>
                        </div>
                    </UnFollowUser>
                        : <FollowUser id={id}>
                            <div className="button-follow pointer">
                                <span>Theo Dõi</span>
                            </div>
                        </FollowUser>}
                </div>
            </div>
            <div className="first-athor-right">
                <img src={`${urlimg}/${avatar}`} alt="" />
            </div>
        </div>
    )
}

export default RenderFirtAuthor