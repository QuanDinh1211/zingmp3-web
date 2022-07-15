import axios from "axios"
import { createContext, useReducer, useEffect } from "react"

import { apiurl } from './consts'


import { authorReducer } from '../reducer/authorReducer'
import { GET_LIST_AUTHOR, SET_AUTHOR } from './action'

export const AuthorContext = createContext()


const AuthorContextProvider = ({ children }) => {
    const [authorState, dispatch] = useReducer(authorReducer, {
        author: null,
        authors: [],
    })


    const getListAuthor = async () => {
        try {
            const response = await axios.get(`${apiurl}/user/getUser`)
            if (response.data.success) {
                console.log(response.data.user);
                dispatch(GET_LIST_AUTHOR(response.data.user))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    useEffect(() => {
        getListAuthor()
    }, [])




    const setAuthor = async (flug) => {
        try {
            const response = await axios.get(`${apiurl}/user/${flug}`)
            if (response.data.success) {
                dispatch(SET_AUTHOR(response.data.user))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const setAuthorName = async (name) => {
        try {
            const response = await axios.get(`${apiurl}/user/getUserName/${name}`)
            if (response.data.success) {
                dispatch(SET_AUTHOR(response.data.user))
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const followUser = async (id) => {
        try {
            const response = await axios.get(`${apiurl}/user/follow/${id}`)
            if (response.data.success) {
                dispatch(SET_AUTHOR(response.data.user))
                await getListAuthor()
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const unFollowUser = async (id) => {
        try {
            const response = await axios.get(`${apiurl}/user/unfollow/${id}`)
            if (response.data.success) {
                dispatch(SET_AUTHOR(response.data.user))
                await getListAuthor()
                return response.data
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    // action

    const AuthorContextData = { authorState, setAuthor, setAuthorName, followUser, unFollowUser }

    return (
        <AuthorContext.Provider value={AuthorContextData}>
            {children}
        </AuthorContext.Provider>
    )
}


export default AuthorContextProvider