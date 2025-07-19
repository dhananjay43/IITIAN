const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userService } = require('../data/users')

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  })
}

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = userService.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = userService.create({
      name,
      email,
      password: hashedPassword
    })

    // Remove password from response
    const userResponse = { ...user }
    delete userResponse.password

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token: generateToken(user.id)
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = userService.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Remove password from response
    const userResponse = { ...user }
    delete userResponse.password

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token: generateToken(user.id)
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = { ...req.user }
    delete user.password

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = userService.findByEmail(email)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found with this email'
      })
    }

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Save it to the database with expiration
    // 3. Send email with reset link
    
    // For demo purposes, we'll just return a success message
    res.status(200).json({
      success: true,
      message: 'Password reset email sent (demo mode)'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body
    const { token } = req.params

    // In a real application, you would validate the reset token
    // For demo purposes, we'll simulate success
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful (demo mode)'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword
}