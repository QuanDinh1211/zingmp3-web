import { useContext } from 'react'

import { LibraryContext } from '../../../../store/contexts/libraryContext'
import StoryItem from './StoryItem'

const ListStory = ({ listStory }) => {

    const { libraryState: { library } } = useContext(LibraryContext)

    return (
        <div className="list-post ">
            {listStory.map((story) => {

                let { description, content, likes, _id, user, createdAt } = story
                let loveUser = false
                if (library.includes(user._id)) {
                    loveUser = true
                }
                console.log(loveUser)

                return <StoryItem key={_id} id={_id} description={description} loveUser={loveUser} content={content} likes={likes} createdAt={createdAt} user={user} />
            })}
        </div>
    )
}

export default ListStory