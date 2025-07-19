const { interviewService } = require('../data/interviews')

/**
 * @desc    Get available interview slots
 * @route   GET /api/interviews/available
 * @access  Public
 */
const getAvailableSlots = async (req, res, next) => {
  try {
    const filters = req.query
    const slots = interviewService.getAvailableSlots(filters)

    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get user's interviews
 * @route   GET /api/interviews/user/:userId
 * @access  Private
 */
const getUserInterviews = async (req, res, next) => {
  try {
    const { userId } = req.params
    
    // Check if user is accessing their own interviews
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const interviews = interviewService.getByUserId(userId)

    res.status(200).json({
      success: true,
      count: interviews.length,
      data: interviews
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Book an interview
 * @route   POST /api/interviews/book
 * @access  Private
 */
const bookInterview = async (req, res, next) => {
  try {
    const userId = req.user.id
    const bookingData = {
      ...req.body,
      userId,
      // Mock interviewer assignment - in real app would be from selected slot
      interviewerId: 'mock-interviewer-id',
      interviewerName: 'Dr. Eleanor Vance',
      interviewerCompany: 'Tech Solutions Inc.',
      price: 50.00
    }

    const interview = interviewService.create(bookingData)

    res.status(201).json({
      success: true,
      message: 'Interview booked successfully',
      data: interview
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Cancel an interview
 * @route   PUT /api/interviews/:id/cancel
 * @access  Private
 */
const cancelInterview = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const interview = interviewService.findById(id)
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      })
    }

    // Check if user owns this interview
    if (interview.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const cancelled = interviewService.cancel(id)
    
    if (!cancelled) {
      return res.status(400).json({
        success: false,
        error: 'Unable to cancel interview'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Interview cancelled successfully'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get interview feedback
 * @route   GET /api/interviews/:id/feedback
 * @access  Private
 */
const getInterviewFeedback = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const interview = interviewService.findById(id)
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      })
    }

    // Check if user owns this interview
    if (interview.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    if (!interview.feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not available yet'
      })
    }

    res.status(200).json({
      success: true,
      data: {
        feedback: interview.feedback,
        rating: interview.rating,
        interviewer: interview.interviewerName,
        company: interview.interviewerCompany
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Submit interview feedback (for interviewers)
 * @route   POST /api/interviews/:id/feedback
 * @access  Private
 */
const submitFeedback = async (req, res, next) => {
  try {
    const { id } = req.params
    const { feedback, rating } = req.body

    const interview = interviewService.findById(id)
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      })
    }

    const updated = interviewService.addFeedback(id, feedback, rating)
    
    if (!updated) {
      return res.status(400).json({
        success: false,
        error: 'Unable to submit feedback'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAvailableSlots,
  getUserInterviews,
  bookInterview,
  cancelInterview,
  getInterviewFeedback,
  submitFeedback
}