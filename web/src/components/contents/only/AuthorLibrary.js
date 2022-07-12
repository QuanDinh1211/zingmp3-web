import { useContext } from 'react'
import { LibraryContext } from '../../../store/contexts/libraryContext'
import { AuthorContext } from '../../../store/contexts/authorContext'
import UserItemCol from '../staticComponents/user/UserItemCol'

const AuthorLibrary = () => {
    const { libraryState: { authors } } = useContext(LibraryContext)
    const { authorState } = useContext(AuthorContext)

    let listAthor = []

    authorState.authors.map(author => {
        if (authors.includes(author._id)) {
            listAthor.push(author)
        }
        return null
    })
    return (
        <div className="display-list-user row">
            {listAthor.map((author, index) => {
                const { name, followers, avatar, slug, _id } = author
                if (index < 4) {
                    return (
                        <div key={index} className="col-3">
                            <UserItemCol name={name} avatar={avatar} love followers={followers} slug={slug} id={_id} />
                        </div>
                    )
                }
                return null

            })}
        </div>
    )
}

export default AuthorLibrary