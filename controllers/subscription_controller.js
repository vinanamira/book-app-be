const { postSubscriptionValidation } = require('../validations/input_validations.js')
const {
    getAllSubscriptionPlanService,
    getSpecificSubscriptionPlanService,
    postAddSubscriptionPlanService,
    postCheckoutSubscriptionPlanService,
    updateSubscriptionPlanService,
    deleteSubscriptionPlanService
} = require('../services/subscription_services.js')
const {
    sendSuccess,
    sendCreated,
    sendError,
} = require('../helpers/responses.js')

const getAllSubscriptionPlan = async (req, res) => {
    try {
        const result = await getAllSubscriptionPlanService(req, res)
        if (result != null) return sendSuccess(res, 'Get all subscription plans success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const getSpecificSubscriptionPlan = async (req, res) => {
    try {
        const result = await getSpecificSubscriptionPlanService(req, res)
        if (result != null) return sendSuccess(res, 'Get subscription plan success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const postAddSubscriptionPlan = async (req, res) => {
    try {
        const { error } = postSubscriptionValidation(req.body)
        if (error) return sendError(res, error.details[0].message, 400)

        const result = await postAddSubscriptionPlanService(req, res)
        if (result != null) return sendCreated(res, 'Subscription plan created!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const postCheckoutSubscriptionPlan = async (req, res) => {
    try {
        const result = await postCheckoutSubscriptionPlanService(req, res)
        if (result != null) return sendSuccess(res, 'Plan checkout success!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const updateSubscriptionPlan = async (req, res) => {
    try {
        const { error } = postSubscriptionValidation(req.body)
        if (error) return sendError(res, error.details[0].message, 400)

        const result = await updateSubscriptionPlanService(req, res)
        if (result != null) return sendSuccess(res, 'Subscription plan updated!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

const deleteSubscriptionPlan = async (req, res) => {
    try {
        const result = await deleteSubscriptionPlanService(req, res)
        if (result != null) return sendSuccess(res, 'Subscription plan deleted!', result)
    } catch (error) {
        console.error(error)
        return sendError(res, 'Internal server error!')
    }
}

module.exports = {
    getAllSubscriptionPlan,
    getSpecificSubscriptionPlan,
    postAddSubscriptionPlan,
    postCheckoutSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan
}