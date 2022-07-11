import axios from "axios"
import { createContext, useReducer, useEffect } from "react"

import { apiurl } from './consts'


import { libraryReducer } from '../reducer/libraryReducer'
import { ADD_LIBRARY, ADD_LIBRARYALBUM, ADD_LIBRARYSONG, ADD_LIBRARYPLAYLIST, CREATE_LIBRARYPLAYLIST, DELETE_LIBRARYPLAYLIST } from './action'

export const LibraryContext = createContext()


const LibraryContextProvider = ({ children }) => {
    const [libraryState, dispatch] = useReducer(libraryReducer, {
        songs: [],
        albums: [],
        playlists: [],
        library: []
    })


    const getLibrary = async () => {
        try {
            const response = await axios.get(`${apiurl}/library/getLibrary`)
            if (response.data.success) {
                dispatch(ADD_LIBRARY(response.data.library))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const getLibraryAlbum = async () => {
        try {
            const response = await axios.get(`${apiurl}/library/getLibrary/album`)
            if (response.data.success) {
                dispatch(ADD_LIBRARYALBUM(response.data.library))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const getLibrarySong = async () => {
        try {
            const response = await axios.get(`${apiurl}/library/getLibrary/song`)
            if (response.data.success) {
                dispatch(ADD_LIBRARYSONG(response.data.library))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const getLibraryPlaylist = async () => {
        try {
            const response = await axios.get(`${apiurl}/library/getLibrary/playlist`)
            if (response.data.success) {
                dispatch(ADD_LIBRARYPLAYLIST(response.data.library))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    useEffect(() => {
        getLibrary()
        getLibraryAlbum()
        getLibrarySong()
        getLibraryPlaylist()
    }, [])


    const createLibrary = async (formData) => {
        try {
            const response = await axios.post(`${apiurl}/library/createLibrary`, formData)
            if (response.data.success) {
                dispatch(CREATE_LIBRARYPLAYLIST(response.data.library))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const deleteLibrary = async (id) => {
        try {
            const response = await axios.delete(`${apiurl}/library/${id}`)
            if (response.data.success) {
                dispatch(DELETE_LIBRARYPLAYLIST(response.data.library))
                return response.data
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }


    const LibraryContextData = { libraryState, createLibrary, deleteLibrary }

    return (
        <LibraryContext.Provider value={LibraryContextData}>
            {children}
        </LibraryContext.Provider>
    )
}


export default LibraryContextProvider