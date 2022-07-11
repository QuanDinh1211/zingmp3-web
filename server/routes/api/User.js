const express = require('express')
const router = express.Router()

const uploadAvatar = require('../upload/avatarUpload')
const UserController = require('../../controllers/apiControllers/userContollers')
const verifyTocken = require('../../middleware/verifyTocken')

const { createNewUser, getUser, getUserLogin, deleteUser, updateUser, login, followUser, unFollowUser, getOneUser } = UserController

router.get('/getUser', getUser)
router.post('/login', login)
router.post('/register', uploadAvatar.single('avatar'), createNewUser)
router.put('/update/:userId', uploadAvatar.single('avatar'), updateUser)
router.get('/follow/:userId', followUser)
router.get('/unfollow/:userId', unFollowUser)
router.delete('/:userId', deleteUser)
router.get('/:flug', getOneUser)
router.get('/', verifyTocken, getUserLogin)




module.exports = router