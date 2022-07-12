import axios from "axios"
import { createContext, useReducer, useState, useEffect } from "react"

import { apiurl } from './consts'


import { songReducer } from '../reducer/songReducer'
import { ADD_SONG, GET_SONG } from './action'

export const SongContext = createContext()


const SongContextProvider = ({ children }) => {
    const [songState, dispatch] = useReducer(songReducer, {
        song: null,
        songs: [],
    })

    const [songPlay, setSongPlay] = useState(true)

    const [showAddSongModal, setShowAddSongModal] = useState(false)


    const getSong = async () => {
        try {
            const response = await axios.get(`${apiurl}/song/getSong`)
            if (response.data.success) {
                dispatch(ADD_SONG(response.data.song))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    useEffect(() => {
        getSong()
    }, [])

    const createSong = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/song/createSong`, formData)
            if (response.data.success) {
                dispatch(ADD_SONG(response.data.song))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const getOneSong = async (songId) => {
        const response = await axios.get(`${apiurl}/song/getOneSong/${songId}`)
        if (response.data.success) {
            dispatch(GET_SONG(response.data.song))
            return response.data
        }
    }

    // action

    const likeSong = async (idSong) => {
        try {
            const response = await axios.get(`${apiurl}/song/likes/${idSong}`)
            if (response.data.success) {
                await getSong()
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const unlikeSong = async (idSong) => {
        try {
            const response = await axios.get(`${apiurl}/song/unlikes/${idSong}`)
            if (response.data.success) {
                await getSong()
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const uploadMp3 = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/upload/mp3`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('upload succes')

            return response.data
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const songContextData = { songState, showAddSongModal, setShowAddSongModal, createSong, getOneSong, songPlay, setSongPlay, likeSong, unlikeSong, uploadMp3 }

    return (
        <SongContext.Provider value={songContextData}>
            {children}
        </SongContext.Provider>
    )
}


export default SongContextProvider