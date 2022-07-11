import axios from "axios"
import { createContext, useReducer, useState, useEffect } from "react"

import { apiurl } from './consts'


import { playlistReducer } from '../reducer/playlistReducer'
import { ADD_PLAYLIST, SET_PLAYLIST, ADD_SONG_PLAYLIST } from './action'

export const PlaylistContext = createContext()


const PlaylistContextProvider = ({ children }) => {
    const [playlistState, dispatch] = useReducer(playlistReducer, {
        playlist: null,
        songs: [],
        playlists: [],
    })

    const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false)

    const getPlaylist = async () => {
        try {
            const response = await axios.get(`${apiurl}/playlist/getPlaylist`)
            if (response.data.success) {
                console.log(response.data.playlist);
                dispatch(ADD_PLAYLIST(response.data.playlist))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const { playlist } = playlistState

    const getSongPlaylist = async () => {
        if (!playlist) {
            return { success: false, message: "playlist not found" }
        }
        try {
            const response = await axios.get(`${apiurl}/song/getSongPlaylist/${playlist._id}`)
            if (response.data.success) {
                console.log(response.data.song);
                dispatch(ADD_SONG_PLAYLIST(response.data.song))
                return response.data
            }
        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }

    useEffect(() => {
        getPlaylist()
    }, [])

    useEffect(() => {
        getSongPlaylist()
    }, [playlist])

    const createPlaylist = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/playlist/createPlaylist`, formData)
            if (response.data.success) {
                dispatch(ADD_PLAYLIST(formData))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const setPlaylist = async (idPlaylist) => {
        try {
            const response = await axios.get(`${apiurl}/playlist/${idPlaylist}`)
            if (response.data.success) {
                dispatch(SET_PLAYLIST(response.data.playlist))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const likePlaylist = async (idPlaylist) => {
        try {
            const response = await axios.get(`${apiurl}/playlist/likes/${idPlaylist}`)
            if (response.data.success) {
                dispatch(SET_PLAYLIST(response.data.playlist))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const unlikePlaylist = async (idPlaylist) => {
        try {
            const response = await axios.get(`${apiurl}/playlist/unlikes/${idPlaylist}`)
            if (response.data.success) {
                dispatch(SET_PLAYLIST(response.data.playlist))
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

    const playlistContextData = { playlistState, showAddPlaylistModal, setShowAddPlaylistModal, createPlaylist, setPlaylist, likePlaylist, unlikePlaylist, uploadAvatar }

    return (
        <PlaylistContext.Provider value={playlistContextData}>
            {children}
        </PlaylistContext.Provider>
    )
}


export default PlaylistContextProvider