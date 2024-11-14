// const { users } = require('../models/index.js')
const { postRegisterValidation } = require('../validations/input_validations.js')
const {
    postRegisterService,
    postLoginService,
    postLogoutService,
} = require('../services/auth_services.js')
const {
    sendSuccess,
    sendCreated,
    sendError,
} = require('../helpers/responses.js')

const postRegister = async (req, res) => {
    try {
        const { error } = postRegisterValidation(req.body)
        if (error) return sendError(res, error.details[0].message, 400)

        const result = await postRegisterService(req, res)
        if (result != null) return sendCreated(res, 'User created!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const postLogin = async (req, res) => {
    try {
        const result = await postLoginService(req, res)
        if (result != null) return sendSuccess(res, 'Login success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const postLogout = async (req, res) => {
    try {
        const result = await postLogoutService(req, res)
        if (result != null) return sendSuccess(res, result.message, {})
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

module.exports = {
    postRegister,
    postLogin,
    postLogout,
}