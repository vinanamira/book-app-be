const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { user } = require('../models/index.js')
const { sendError, sendUnauthorized } = require('../helpers/responses.js')

const postRegisterService = async (req, res) => {
    userid = crypto.randomUUID()

    const { username, fullname, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const users = await user.findOne({
        where: {
            username: username
        }
    })

    if (users) sendError(res, 'Username already exists!', 400)
    else {
        await user.create({
            userid: userid,
            subscriptionid: null,
            username: username,
            fullname: fullname,
            email: email,
            password: hashedPassword,
            annualchargeAt: new Date().toISOString(),
            avatar: null,
        })
    }

    return req.body
}

const postLoginService = async (req, res) => {
    const { username, password } = req.body

    const users = await user.findOne({
        where: {
            username: username
        }
    })

    if (!users) sendUnauthorized(res, 'Invalid username or password!')

    const isPasswordValid = await bcrypt.compare(password, users.password)
    if (!isPasswordValid) sendUnauthorized(res, 'Invalid username or password!')

    const accessToken = jwt.sign({
        username: user.username,
        password: user.password
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })

    const login = {
        userid: users.userid,
        username: users.username,
    }

    return {
        login,
        accessToken,
    }
}

const postLogoutService = async (req, res) => {
    const token = req.header('Authorization') || req.cookies.accessToken
    if (!token) return sendUnauthorized(res)

    res.clearCookie('accessToken')

    return { message: 'Logout success!' }
}

module.exports = {
    postRegisterService,
    postLoginService,
    postLogoutService,
}