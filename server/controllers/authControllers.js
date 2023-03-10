const bcrypt = require('bcrypt')
const validationSchema = require('../utils/validationSchema');
const User = require('../models/user');
const { generateTokens } = require('../utils/generateTokens');
const UserToken = require('../models/userToken');

const signUp = async (req, res) => {
    try {
        const { error } = validationSchema.signUpBodyValidation(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res
                .status(400)
                .json({ error: true, message: 'User with given email is already exist' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword }).save()
        res
            .status(201)
            .json({ error: false, message: 'Account created successfully' })
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ error: true, message: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    try {
        const { error } = validationSchema.loginBodyValidation(req.body)
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(401)
                .json({ error: true, message: 'Invalid email or password' })
        }
        const verifyPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!verifyPassword) {
            return res
                .status(401)
                .json({ error: true, message: 'Invalid email or Password' })
        }
        const { accessToken, refreshToken } = await generateTokens(user)
        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: 'Logged in successfully'
        })
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ error: true, message: 'Internal Server Error' })
    }
}

const logout = async (req, res) => {
    try {
        const { error } = validationSchema.refreshTokenBodyValidation(req.body)
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message })
        }
        const userToken = await UserToken.findOne({ token: req.body.refreshToken })

        if (!userToken) {
            return res
                .status(200)
                .json({ error: false, message: 'Logged Out Sucessfully' })
        }
        await userToken.delete()
        res
            .status(200)
            .json({ error: false, message: 'Logged Out Sucessfully' })
    }
    catch (err) {
        res
            .status(500)
            .json({ error: true, message: 'Internal Server Error' })
    }
}

module.exports = {
    signUp,
    login,
    logout
}