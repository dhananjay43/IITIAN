const Joi = require('joi')

/**
 * Generic validation middleware
 * Validates request body against provided schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      })
    }
    
    next()
  }
}

// Auth validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match'
    }),
  terms: Joi.boolean().valid(true).required()
    .messages({
      'any.only': 'You must accept the terms and conditions'
    })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

// Profile validation schemas
const profileUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[\d\s-()]+$/),
  college: Joi.string().max(100),
  course: Joi.string().max(100),
  currentYear: Joi.number().integer().min(1).max(6),
  graduationYear: Joi.number().integer().min(2024).max(2030),
  linkedinUrl: Joi.string().uri(),
  preferredLanguage: Joi.string().max(50)
})

// Interview booking validation
const bookInterviewSchema = Joi.object({
  date: Joi.date().min('now').required(),
  time: Joi.string().required(),
  interviewType: Joi.string().valid('Internship', 'Placement').required(),
  domain: Joi.string().valid('Technical', 'Non-Technical').required(),
  profile: Joi.string().valid('AI', 'Data Science', 'Software').required(),
  interviewerId: Joi.string().uuid()
})

// Interviewer application validation
const interviewerApplicationSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  linkedinUrl: Joi.string().uri().pattern(/linkedin\.com/).required(),
  company: Joi.string().min(2).max(100).required(),
  designation: Joi.string().min(2).max(100).required(),
  experience: Joi.number().integer().min(1).max(50).required(),
  hourlyRate: Joi.number().min(10).max(1000).required(),
  expertiseDomains: Joi.string().min(10).max(500).required(),
  availability: Joi.string().min(10).max(500).required(),
  terms: Joi.boolean().valid(true).required()
    .messages({
      'any.only': 'You must agree to the terms and conditions'
    })
})

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  bookInterviewSchema,
  interviewerApplicationSchema
}