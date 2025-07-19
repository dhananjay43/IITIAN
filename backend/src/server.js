require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

// Import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const interviewRoutes = require('./routes/interviewRoutes')
const interviewerRoutes = require('./routes/interviewerRoutes')

// Import middleware
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Logging middleware
app.use(morgan('combined'))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'MockInterviewPrep API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/interviews', interviewRoutes)
app.use('/api/interviewers', interviewerRoutes)

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'MockInterviewPrep API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      interviews: '/api/interviews',
      interviewers: '/api/interviewers'
    },
    documentation: 'https://github.com/mockinterviewprep/api-docs'
  })
})

// Error handling middleware (must be last)
app.use(notFound)
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...')
  process.exit(0)
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 MockInterviewPrep API server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`📚 API docs: http://localhost:${PORT}/api`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = server