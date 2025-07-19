const express = require('express')
const { 
  register, 
  login, 
  getProfile, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController')
const { protect } = require('../middleware/auth')
const { validate, registerSchema, loginSchema } = require('../middleware/validation')

const router = express.Router()

// Public routes
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

// Protected routes
router.get('/profile', protect, getProfile)

module.exports = router