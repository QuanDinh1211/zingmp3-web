const UserService = require('../services/userService')

const { handleCreateUser, getAlluser, handleDeleteUser, handleGetOneUser, handleUpdateUser, handleLogin, handleFollowUser, handleGetUserFlug } = UserService


class UserController {

    login = async (req, res) => {
        const dataUser = await handleLogin(req, res)
        if (dataUser.success) {
            const { success, message, accessToken } = dataUser
            return res.json({
                success,
                message,
                accessToken
            })
        }
    }

    getUserLogin = async (req, res) => {
        const user = await handleGetOneUser({ _id: req.userId })
        if (user) {
            return res.json({
                success: true,
                message: "Login successfully",
                user
            })
        }
    }


    getUser = async (req, res, next) => {
        const user = await getAlluser(res)
        return res.json({ success: true, message: 'List User successfully!', user })
    }

    getOneUser = async (req, res) => {
        const user = await handleGetOneUser({ slug: req.params.flug }, res)
        if (user) {
            return res.json({
                success: true,
                message: "Get User Successfully",
                user
            })
        }
    }

    createNewUser = async (req, res, next) => {
        const avatar = req.file.originalname
        const data = {
            ...req.body,
            avatar
        }
        const userData = await handleCreateUser(data, res)
        if (userData.success) {
            return res.json({ userData })
        }
    }

    deleteUser = async (req, res) => {

        const user = await handleDeleteUser(req.params.userId, res)
        if (user) {
            return res.json({
                success: true,
                message: "Delete User Successfully",
                user
            })
        }
    }


    updateUser = async (req, res) => {
        const avatar = req.file.originalname
        const dataUpdate = {
            ...req.body,
            avatar
        }
        const user = await handleUpdateUser(req.params.userId, dataUpdate, res)
        if (user) {
            return res.json({
                success: true,
                message: "Update User Successfully",
                user
            })
        }
    }

    followUser = async (req, res) => {
        const user = await handleGetOneUser({ _id: req.params.userId }, res)
        if (user) {
            const { followers } = user
            const newFollowers = Number(followers) + 1
            const dataUser = { followers: newFollowers }
            const newUser = await handleFollowUser(req.params.userId, dataUser, res)
            if (newUser) {
                return res.json({
                    success: true,
                    message: "Update User Successfully",
                    user: newUser
                })
            }
        }

    }

    unFollowUser = async (req, res) => {
        const user = await handleGetOneUser({ _id: req.params.userId }, res)
        if (user) {
            const { followers } = user
            const newFollowers = Number(followers) - 1
            const dataUser = { followers: newFollowers }
            const newUser = await handleFollowUser(req.params.userId, dataUser, res)
            if (newUser) {
                return res.json({
                    success: true,
                    message: "Update User Successfully",
                    user: newUser
                })
            }
        }
    }

}

module.exports = new UserController