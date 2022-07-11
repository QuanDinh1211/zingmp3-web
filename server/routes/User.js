const express = require('express')
const router = express.Router()

const uploadAvatar = require('./upload/avatarUpload')
const UserController = require('../controllers/userContollers')
const verifyTocken = require('../middleware/verifyTocken')

const { createUser, createNewUser, getUser, deleteUser, editUser, updateUser, getFormLogin, login, logout, followUser, unFollowUser, getOneUser } = UserController

router.get('/getUser', getUser)
router.get('/createUser', createUser)
router.get('/formlogin', getFormLogin)
router.post('/login', login)
router.get('/logout', logout)
router.post('/createUser', uploadAvatar.single('avatar'), createNewUser)
router.get('/edit/:userId', editUser)
router.put('/update/:userId', uploadAvatar.single('avatar'), updateUser)
router.get('/follow/:userId', followUser)
router.get('/unfollow/:userId', unFollowUser)
router.delete('/:userId', deleteUser)
router.get('/:flug', getOneUser)




module.exports = router