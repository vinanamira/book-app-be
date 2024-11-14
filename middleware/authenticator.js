const jwt = require('jsonwebtoken')
const { sendUnauthorized } = require('../helpers/responses.js')

const authenticator = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return sendUnauthorized(res)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) return sendUnauthorized(res)

        req.user = decode
        next()
    })
}

module.exports = authenticator

