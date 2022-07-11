const UserService = require('./services/userService')
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose')

const { handleCreateUser, getAlluser, handleDeleteUser, handleGetOneUser, handleUpdateUser, handleLogin, handleFollowUser, handleGetUserFlug } = UserService


class UserController {
    createUser(req, res, next) {
        res.render('User/CreateUser')
    }

    getFormLogin(req, res) {
        res.render('User/LoginForm')
    }

    login = async (req, res) => {
        const dataUser = await handleLogin(req, res)
        if (dataUser.success) {
            req.session.userId = dataUser.user._id
            res.redirect('/user/getUser')
        }
    }

    logout = (req, res) => {
        req.session.userId = null
        res.redirect('/user/formlogin')
    }

    getUser = async (req, res, next) => {
        const listUser = await getAlluser(res)
        console.log(req.session.userId);
        res.render('User/renderListUser', { listUser: mutipleMongooseToObject(listUser) })
    }

    getOneUser = async (req, res) => {
        const flug = req.params.flug
        const user = await handleGetOneUser({ slug: req.params.flug }, res)
        if (user) {
            res.render('User/displayUser', { user: mongooseToObject(user) })
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
            res.redirect('/user/getUser')
        }
    }

    deleteUser = async (req, res) => {

        const user = await handleDeleteUser(req.params.userId, res)
        if (user) {
            res.redirect('/user/getUser')
        }
    }

    editUser = async (req, res) => {
        const userUpdate = await handleGetOneUser({ _id: req.params.userId }, res)
        if (userUpdate) {
            res.render('User/UpdateUser', { userUpdate: mongooseToObject(userUpdate) })
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
            res.redirect('/user/getUser')
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
                res.redirect('/user/getUser')
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
                res.redirect('/user/getUser')
            }
        }
    }

}

module.exports = new UserController