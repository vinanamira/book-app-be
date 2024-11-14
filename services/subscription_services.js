const { subscription, user, transaction } = require('../models/index.js')
const midtransClient = require('midtrans-client');
const { sendError, sendUnauthorized, sendNotFound } = require('../helpers/responses.js')
const key = require('dotenv').config();

const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: key.MID_SERVER_KEY,
    clientKey: key.MID_CLIENT_KEY,
})

const getAllSubscriptionPlanService = async (req, res) => {
    const isFound = await subscription.findAll()

    if (!isFound) {
        return sendNotFound(res, 'No subscription plans are found!')
    } else {
        return isFound
    }
}

const getSpecificSubscriptionPlanService = async (req, res) => {
    const id = req.params.id
    const isFound = await subscription.findOne({
        where: {
            id: id
        }
    })

    if (!isFound) {
        return sendNotFound(res, 'No subscription plans are found!')
    } else {
        return isFound
    }
}

const postCheckoutSubscriptionPlanService = async (req, res) => {
    const { subscriptionid, userid, annualPrice, bankName } = req.body

    const plan = await subscription.findOne({
        where: {
            id: subscriptionid
        }
    })
    if (!plan) return sendNotFound(res, 'Subscription plan not found!')

    const random = Math.floor(Math.random() * 1000)
    const today = new Date();
    const chargeAt = today.setDate(today.getDate() + 30)

    const subscriber = await user.findOne({
        where: {
            userid: userid
        }
    })
    
    if (!subscriber) return sendNotFound(res, 'User not found!')
    else {
        await subscriber.update({
            subscriptionid: subscriptionid,
            annualChargeAt: chargeAt,
        }, {
            where: {
                userid: userid
            }
        })
    }

    const dataMidtrans = {
        'payment_type': 'bank_transfer',
        'transaction_details': {
            'order_id': `ORD${random}`,
            'transaction_time': today,
            'gross_amount': annualPrice,
        },
        'plan_details': {
            'id': subscription.id,
            'title': subscription.name,
            'price': subscription.annualPrice,
            'chargeAt': chargeAt,
            'review_limit': subscription.reviewCount,
        },
        'bank_transfer': {
            'bank': `${bankName}`,
        },
        'customer_details': {
            'username': subscriber.username,
            'name': subscriber.fullname,
            'email': subscriber.email,
        }
    }

    let transactionToken = await coreApi.charge(dataMidtrans)

    let data = await transaction.create({
        orderid: `ORD${random}`,
        userid: subscriber.userid,
        subscriptionid: plan.id,
        bank: `${bankName}`,
        va_number: transactionToken['va_numbers'][0]['va_number'],
        status: 'pending',
    })

    return data
}

const postAddSubscriptionPlanService = async (req, res) => {
    const token = req.header('Authorization') || req.cookies.accessToken
    if (!token) return sendUnauthorized(res)

    const { name, reviewCount, annualPrice } = req.body

    const sub = await subscription.create({
        name: name,
        reviewCount: reviewCount,
        annualPrice: annualPrice,
    })

    return sub
}

const updateSubscriptionPlanService = async (req, res) => {
    const token = req.header('Authorization') || req.cookies.accessToken
    if (!token) return sendUnauthorized(res)

    const id = req.params.id
    const { name, reviewCount, annualPrice } = req.body

    const isFound = await subscription.findOne({
        where: {
            id: id
        }
    })

    if (!isFound) {
        return sendNotFound(res, 'No book and review are found!')
    } else {
        await subscription.update({
            name: name,
            reviewCount: reviewCount,
            annualPrice: annualPrice,
        },
            {
                where: {
                    id: id
                }
            })
    }

    return req.body
}

const deleteSubscriptionPlanService = async (req, res) => {
    const token = req.header('Authorization') || req.cookies.accessToken
    if (!token) return sendUnauthorized(res)

    const id = req.params.id
    const isFound = await subscription.findOne({
        where: {
            id: id
        }
    })

    if (!isFound) {
        return sendNotFound(res, 'No book and review are found!')
    } else {
        await book.destroy({
            where: {
                id: findById
            },
        });

        return isFound
    }
}

module.exports = {
    getAllSubscriptionPlanService,
    getSpecificSubscriptionPlanService,
    postAddSubscriptionPlanService,
    postCheckoutSubscriptionPlanService,
    updateSubscriptionPlanService,
    deleteSubscriptionPlanService
}