const express = require('express')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const {
  getAllBooks,
  getSpecificBookById,
  postAddBook,
  updateBook,
  deleteBook
} = require('../controllers/book_controller.js')
const {
  getAllBookReviews,
  postAddBookReview,
  updateBookReview,
  deleteBookReview
} = require('../controllers/book_review_controller.js')
const {
  postRegister,
  postLogin,
  postLogout,
} = require('../controllers/auth_controller.js')
const { getUserProfile, getAllUser } = require('../controllers/user_controller.js')
const {
  getAllSubscriptionPlan,
  postAddSubscriptionPlan,
  postCheckoutSubscriptionPlan,
  getSpecificSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
} = require('../controllers/subscription_controller.js')

const { authenticator } = require('../middleware/authenticator.js')

const router = express.Router()
const _filename = __filename;
const _dirname = path.dirname(_filename);

router.use(express.static(path.join(_dirname, '/public')));
router.use(fileUpload())

// ============= CATALOGUE API =============
router.get('/books', getAllBooks)
router.get('/books/:id', getSpecificBookById)
router.post('/books', postAddBook)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

// ============= REVIEW API =============
router.get('/books/:book_id/reviews', getAllBookReviews)
router.post('/books/:book_id/reviews', postAddBookReview)
router.put('/books/:book_id/reviews/:review_id', updateBookReview)
router.delete('/books/:book_id/reviews/:review_id', deleteBookReview)

// ============= AUTH API =============
router.post('/auth/register', postRegister)
router.post('/auth/login', postLogin)
router.post('/auth/logout', postLogout)

// ============= USER API =============
router.get('/users', getAllUser)
router.get('/users/profile/:userid', getUserProfile)

// ============= SUBSCRIPTION PLAN API =============
router.get('/subscriptions', getAllSubscriptionPlan)
router.get('/subscriptions/:id', getSpecificSubscriptionPlan)
router.post('/subscriptions', postAddSubscriptionPlan)
router.post('/subscriptions/checkout', postCheckoutSubscriptionPlan)
router.put('/subscriptions/:id', updateSubscriptionPlan)
router.delete('/subscriptions/:id', deleteSubscriptionPlan)

module.exports = router