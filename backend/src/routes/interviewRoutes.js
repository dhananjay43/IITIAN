const express = require('express')
const { 
  getAvailableSlots,
  getUserInterviews,
  bookInterview,
  cancelInterview,
  getInterviewFeedback,
  submitFeedback
} = require('../controllers/interviewController')
const { protect } = require('../middleware/auth')
const { validate, bookInterviewSchema } = require('../middleware/validation')

const router = express.Router()

// Public routes (available slots can be viewed without auth)
router.get('/available', getAvailableSlots)

// Protected routes
router.use(protect)

router.get('/user/:userId', getUserInterviews)
router.post('/book', validate(bookInterviewSchema), bookInterview)
router.put('/:id/cancel', cancelInterview)
router.get('/:id/feedback', getInterviewFeedback)
router.post('/:id/feedback', submitFeedback)

module.exports = router