import { useContext } from 'react'

import { AuthorContext } from '../../../store/contexts/authorContext'
import { LibraryContext } from '../../../store/contexts/libraryContext'
import RenderFirtAuthor from '../staticComponents/user/RenderFirtAuthor'

const RenderAuthor = () => {

    const { authorState } = useContext(AuthorContext)
    const { libraryState: { library } } = useContext(LibraryContext)

    const { author: { name, description, avatar, followers, _id } } = authorState

    let love = false
    if (library.includes(_id)) {
        love = true
    }

    return (
        <div className="render-athor">
            <RenderFirtAuthor id={_id} name={name} description={description} love={love} avatar={avatar} followers={followers} />
        </div>
    )
}

export default RenderAuthor