const jwt = require('jsonwebtoken')
const { users } = require('../data/users')

/**
 * Authentication middleware
 * Verifies JWT token and adds user to request object
 */
const protect = async (req, res, next) => {
  try {
    let token

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
      
      // Get user from token
      const user = users.find(u => u.id === decoded.id)
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        })
      }

      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      })
    }
  } catch (error) {
    next(error)
  }
}

/**
 * Role-based authorization middleware
 * Restricts access to specific user roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      })
    }

    next()
  }
}

module.exports = {
  protect,
  authorize
}