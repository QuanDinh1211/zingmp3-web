import { useContext } from 'react'

import { UserContext } from '../store/contexts/userContext'
import { AuthorContext } from '../store/contexts/authorContext'
import { LibraryContext } from '../store/contexts/libraryContext'


export const FollowUser = ({ children, id }) => {

    const { createLibrary } = useContext(LibraryContext)
    const { followUser } = useContext(AuthorContext)
    const { userState: { user } } = useContext(UserContext)

    const handleClickFollowUser = async () => {
        if (user) {
            await followUser(id)
            let fromData = {
                product: id,
                category: "USER"
            }
            await createLibrary(fromData)
        }
    }

    return (
        <span onClick={handleClickFollowUser}>
            {children}
        </span>
    )

}

export const UnFollowUser = ({ children, id }) => {
    const { deleteLibrary } = useContext(LibraryContext)
    const { unFollowUser } = useContext(AuthorContext)
    const { userState: { user } } = useContext(UserContext)

    const handleClickUnFollowUser = async () => {
        if (user) {
            await unFollowUser(id)
            await deleteLibrary(id)
        }
    }

    return (
        <span onClick={handleClickUnFollowUser}>
            {children}
        </span>
    )
}
