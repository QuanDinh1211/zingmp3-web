import axios from "axios"
import { createContext, useReducer, useState, useEffect } from "react"

import { apiurl, LOCAL_STORAGE_TOCKEN_NAME } from './consts'


import { userReducer } from '../reducer/userReducer'
import setUserToken from '../../utils/setUserToken'
import { SET_USER } from './action'

export const UserContext = createContext()


const UserContextProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(userReducer, {
        isAuthenticated: false,
        user: null
    })

    const [showLoginModal, setShowLoginModal] = useState(false)

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOCKEN_NAME]) {
            setUserToken(localStorage[LOCAL_STORAGE_TOCKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiurl}/user`)
            if (response.data.success) {
                dispatch(SET_USER({
                    isAuthenticated: true,
                    user: response.data.user
                }))
            }
        } catch (err) {

            localStorage.removeItem(LOCAL_STORAGE_TOCKEN_NAME)
            setUserToken(null)
            dispatch(SET_USER({
                isAuthenticated: false,
                user: null
            }))
        }
    }

    useEffect(() => {
        loadUser()
    }, [])



    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiurl}/user/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOCKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        } catch (err) {
            if (err.response.data) {
                return err.response.data
            }
            else {
                return { success: false, message: err.message }
            }
        }
    }




    const userContextData = { userState, showLoginModal, setShowLoginModal, loginUser }

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider