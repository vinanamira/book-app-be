const { user } = require('../models/index.js')
const { sendError, sendUnauthorized } = require('../helpers/responses.js')

const getUserProfileService = async (req, res) => {
    const token = req.header('Authorization') || req.cookies.accessToken
    if (!token) return sendUnauthorized(res)

    const findUserId = req.params.userid
    const data = await user.findOne({
        where: {
            userid: `${findUserId}`
        }
    })

    return {
        userid: data.userid,
        subscriptionid: data.subscriptionid,
        annualChargeAt: data.annualChargeAt,
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        avatar: data.avatar,
    }
}

const getAllUserService = async (req, res) => {
    const data = await user.findAll()
    return data
}

module.exports = {
    getUserProfileService,
    getAllUserService,
}