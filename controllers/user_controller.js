const {
    getUserProfileService,
    getAllUserService,
} = require('../services/user_services.js')
const {
    sendSuccess,
    sendError,
} = require('../helpers/responses.js')

const getUserProfile = async (req, res) => {
    try {
        const result = await getUserProfileService(req, res)
        if (result != null) return sendSuccess(res, 'Get user profile success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const getAllUser = async (req, res) => {
    try {
        const result = await getAllUserService(req, res)
        if (result != null) return sendSuccess(res, 'Get all user success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

module.exports = {
    getUserProfile,
    getAllUser,
}