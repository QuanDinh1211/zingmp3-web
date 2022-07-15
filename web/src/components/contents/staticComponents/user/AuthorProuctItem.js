import { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { AuthorContext } from '../../../../store/contexts/authorContext'

const AuthorProuctItem = ({ author }) => {
    let navigate = useNavigate()
    const { setAuthorName } = useContext(AuthorContext)
    const handleClickAthor = async () => {
        let result = await setAuthorName(author)
        if (result.success) {
            navigate(`/author/${author}`, { replace: true })
        }
    }

    return (
        <Link to onClick={handleClickAthor}>{author} </Link>
    )
}

export default AuthorProuctItem