import { useContext } from 'react'

import { StoryContext } from '../../../store/contexts/storyContext'
import ListStory from '../staticComponents/story/ListStory'

const Follow = () => {

    const { storyState: { storys } } = useContext(StoryContext)

    let list1 = []
    let list2 = []
    let list3 = []

    storys.map((story, index) => {
        if (index % 3 === 0) {
            return list3.push(story)
        } else if (index % 2 === 0) {
            return list2.push(story)
        } else {
            return list1.push(story)
        }
    })

    return (
        <div className="wrap-list-post">
            <ListStory listStory={list1} />
            <ListStory listStory={list2} />
            <ListStory listStory={list3} />
        </div>
    )
}

export default Follow