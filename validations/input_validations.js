const joi = require('joi')

const postBookValidation = (book) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        author: joi.string().required(),
        image: joi.string(),
        rating: joi.number().required(),
    })

    return schema.validate(book)
}

const postReviewValidation = (review) => {
    const schema = joi.object({
        reviewerid: joi.string().required(), // username reviewer
        review: joi.string().required(),
        rating: joi.number().required()
    })

    return schema.validate(review)
}

const postUserValidation = (user) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required(),
        avatar: joi.string(),
    })

    return schema.validate(user)
}

const postRegisterValidation = (user) => {
    const schema = joi.object({
        username: joi.string().required(),
        fullname: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required(),
    })

    return schema.validate(user)
}

const postSubscriptionValidation = (subscription) => {
    const schema = joi.object({
        name: joi.string().required(),
        reviewCount: joi.number().required(),
        annualPrice: joi.number().required(),
    })

    return schema.validate(subscription)
}

module.exports = {
    postBookValidation, 
    postReviewValidation,
    postUserValidation,
    postRegisterValidation,
    postSubscriptionValidation,
}