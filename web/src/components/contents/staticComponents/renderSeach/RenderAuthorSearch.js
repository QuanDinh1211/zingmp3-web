import { useContext } from 'react'

import { AuthorContext } from '../../../../store/contexts/authorContext'
import { seachName } from '../../../../utils/seachAction'

const RenderAuthorSearch = ({ dataInput, setDataInput }) => {

    const { author } = dataInput

    const { authorState: { authors } } = useContext(AuthorContext)

    let nameAuthor

    if (author.indexOf(',') !== -1) {
        const listAuthorInput = author.split(',')
        nameAuthor = listAuthorInput.pop()
        console.log(',', nameAuthor);
    } else {
        nameAuthor = author
    }



    const listAuthor = seachName(authors, nameAuthor)

    const handleClickAuthorName = (event) => {
        const name = event.target.innerHTML
        if (author.indexOf(',') !== -1) {
            const listAuthorInput = author.split(',')
            listAuthorInput.pop()
            let authorUpdate = listAuthorInput.join()
            setDataInput({ ...dataInput, author: authorUpdate + ', ' + name })
        } else {
            setDataInput({ ...dataInput, author: name })
        }
    }

    return (
        <div className='Search-focus-author'>
            <div className="header__seach-history">
                <ul className="header__seach-history-list">
                    {listAuthor.map((author, index) => {
                        return (
                            <li onClick={handleClickAuthorName} key={index} className="header__seach-history--item pointer">
                                <a href>{author.name}</a>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}

export default RenderAuthorSearch