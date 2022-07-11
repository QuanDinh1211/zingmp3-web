import { useContext } from 'react'

import { AuthorContext } from '../../../../store/contexts/authorContext'
import { LibraryContext } from '../../../../store/contexts/libraryContext'
import UserItemCol from './UserItemCol'

const ListUserRow = () => {

    const { authorState: { authors } } = useContext(AuthorContext)

    const { libraryState: { library } } = useContext(LibraryContext)

    return (
        <div class="display-list-user row">
            {authors.map((author, index) => {
                const { name, followers, avatar, slug, _id } = author
                if (index < 6) {
                    if (library.includes(_id)) {
                        return (
                            <div key={index} class="col-3">
                                <UserItemCol name={name} avatar={avatar} love followers={followers} slug={slug} id={_id} />
                            </div>
                        )
                    }
                    return (
                        <div key={index} class="col-3">
                            <UserItemCol name={name} avatar={avatar} followers={followers} slug={slug} id={_id} />
                        </div>
                    )
                }
                return null

            })}
        </div>
    )
}

export default ListUserRow