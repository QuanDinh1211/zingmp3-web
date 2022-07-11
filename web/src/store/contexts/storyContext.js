import axios from "axios"
import { createContext, useReducer, useState, useEffect } from "react"

import { apiurl } from './consts'


import { storyReducer } from '../reducer/storyReducer'
import { ADD_STORY } from './action'

export const StoryContext = createContext()


const StoryContextProvider = ({ children }) => {
    const [storyState, dispatch] = useReducer(storyReducer, {
        story: null,
        storys: [],
    })

    const [showAddStoryModal, setShowAddStoryModal] = useState(false)


    const getStory = async () => {
        try {
            const response = await axios.get(`${apiurl}/story/getStory`)
            if (response.data.success) {
                dispatch(ADD_STORY(response.data.story))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    // const { album } = albumState

    // const getSong = async () => {
    //     if (!album) {
    //         return { success: false, message: "album not found" }
    //     }
    //     try {
    //         const response = await axios.get(`${apiurl}/song/getSong/${album._id}`)
    //         if (response.data.success) {
    //             console.log(response.data.song);
    //             dispatch(ADD_SONG_ALBUM(response.data.song))
    //             return response.data
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return { success: false, message: error.message }
    //     }
    // }

    useEffect(() => {
        getStory()
    }, [])

    // useEffect(() => {
    //     getSong()
    // }, [album])

    const createStory = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/story/createStory`, formData)
            if (response.data.success) {
                dispatch(ADD_STORY(response.data.story))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // const setAlbum = async (idAlbum) => {
    //     try {
    //         const response = await axios.get(`${apiurl}/album/${idAlbum}`)
    //         if (response.data.success) {
    //             dispatch(SET_ALBUM(response.data.album))
    //             return response.data
    //         }
    //     } catch (error) {
    //         return { success: false, message: error.message }
    //     }
    // }

    const StoryContextData = { storyState, createStory, showAddStoryModal, setShowAddStoryModal }

    return (
        <StoryContext.Provider value={StoryContextData}>
            {children}
        </StoryContext.Provider>
    )
}


export default StoryContextProvider