const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const handleDeleteAvatar = require('../../public/handleDeleteFile')


class UserService {
    handleCreateUser = async (data, res) => {
        const { name, password, avatar, description } = data

        if (!name || !password) {
            return res.status(400).json({
                success: false,
                message: "missing name or password"
            })
        }

        try {

            const user = await User.findOne({ name })

            if (user) {
                return res
                    .status(400).json({
                        success: false,
                        message: "Username already"
                    })
            }

            const hashedPassword = await argon2.hash(password)

            const dataUser = {
                name,
                password: hashedPassword,
                avatar,
                description,
                followers: '0'
            }

            const newUser = new User(dataUser)
            await newUser.save()

            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            return {
                success: true,
                message: 'User created successfully',
                accessToken
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error ' })
        }
    }

    getAlluser = async (res) => {
        try {
            const listUser = await User.find({}).select('-password')
            return listUser
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error ' })
        }
    }

    handleDeleteUser = async (userId, res) => {
        try {
            const deleteUser = await User.findOneAndDelete({ _id: userId })
            if (!deleteUser) {
                return res.status(401).json({ success: false, message: 'User not found' })
            }
            handleDeleteAvatar(deleteUser.avatar)
            return deleteUser
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetOneUser = async (filter, res) => {
        if (!filter) {
            return res.status(401).json({ success: false, message: 'User id not found' })
        }
        try {

            const user = await User.findOne(filter).select('-password')
            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' })
            }
            return user

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleUpdateUser = async (userId, dataForn, res) => {
        const { name, avatar, description } = dataForn

        if (!name) {
            return res.status(400)
                .json({ success: false, message: 'Name is required' })
        }
        try {
            const user = await User.findOne({ _id: userId }).select('-password')
            let formData = {
                name,
                avatar,
                description
            }
            const userUpdate = await User.findOneAndUpdate({ _id: userId }, formData, { new: true }).select('-password')
            if (!userUpdate) {
                return res.status(401).json({ success: false, message: 'User not found' })
            }
            if (avatar && user.avatar !== avatar) {
                handleDeleteAvatar(user.avatar)
            }
            return userUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }


    }

    handleLogin = async (req, res) => {
        const { name, password } = req.body
        console.log(req.body);

        if (!name || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or password' })
        }

        try {
            const user = await User.findOne({ name })
            if (!user) {
                return res.status(400)
                    .json({ success: false, message: 'Incorrect username or password' })
            }
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(400)
                    .json({ success: false, message: 'Missing username or password' })
            }
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            return {
                success: true,
                message: 'Login in successfully',
                accessToken,
                user
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleFollowUser = async (userId, dataUserNew, res) => {
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User id not found' })
        }
        try {

            const userUpdate = await User.findOneAndUpdate({ _id: userId }, dataUserNew, { new: true }).select('-password')
            if (!userUpdate) {
                return res.status(401).json({ success: false, message: 'User not found' })
            }

            return userUpdate
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }

    }
}

module.exports = new UserService