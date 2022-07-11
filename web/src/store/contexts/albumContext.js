import axios from "axios"
import { createContext, useReducer, useState, useEffect } from "react"

import { apiurl } from './consts'


import { albumReducer } from '../reducer/albumReducer'
import { ADD_ALBUM, SET_ALBUM, ADD_SONG_ALBUM } from './action'

export const AlbumContext = createContext()


const AlbumContextProvider = ({ children }) => {
    const [albumState, dispatch] = useReducer(albumReducer, {
        album: null,
        songs: [],
        albums: [],
    })

    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false)


    const getAlbum = async () => {
        try {
            const response = await axios.get(`${apiurl}/album/getAlbum`)
            if (response.data.success) {
                dispatch(ADD_ALBUM(response.data.album))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }



    const { album } = albumState

    const getSong = async () => {
        if (!album) {
            return { success: false, message: "album not found" }
        }
        try {
            const response = await axios.get(`${apiurl}/song/getSong/${album._id}`)
            if (response.data.success) {
                dispatch(ADD_SONG_ALBUM(response.data.song))
                return response.data
            }
        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }

    useEffect(() => {
        getAlbum()
    }, [])

    useEffect(() => {
        getSong()
    }, [album])





    const createAlbum = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/album/createAlbum`, formData)
            if (response.data.success) {
                dispatch(ADD_ALBUM(response.data.album))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const setAlbum = async (idAlbum) => {
        try {
            const response = await axios.get(`${apiurl}/album/${idAlbum}`)
            if (response.data.success) {
                dispatch(SET_ALBUM(response.data.album))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const likeAlbum = async (idAlbum) => {
        try {
            const response = await axios.get(`${apiurl}/album/likes/${idAlbum}`)
            if (response.data.success) {
                dispatch(SET_ALBUM(response.data.album))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const unlikeAlbum = async (idAlbum) => {
        try {
            const response = await axios.get(`${apiurl}/album/unlikes/${idAlbum}`)
            if (response.data.success) {
                dispatch(SET_ALBUM(response.data.album))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const uploadAvatar = async (formData) => {
        try {
            console.log('upload')
            const response = await axios.post(`${apiurl}/upload/avatar`, formData, {
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

    const albumContextData = { albumState, setAlbum, uploadAvatar, showAddAlbumModal, setShowAddAlbumModal, createAlbum, likeAlbum, unlikeAlbum }

    return (
        <AlbumContext.Provider value={albumContextData}>
            {children}
        </AlbumContext.Provider>
    )
}


export default AlbumContextProvider