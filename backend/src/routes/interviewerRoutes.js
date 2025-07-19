const express = require('express')
const multer = require('multer')
const path = require('path')
const { 
  getAllInterviewers,
  applyToBeInterviewer,
  uploadInterviewerResume,
  getInterviewerProfile
} = require('../controllers/interviewerController')
const { protect } = require('../middleware/auth')
const { validate, interviewerApplicationSchema } = require('../middleware/validation')

const router = express.Router()

// Configure multer for interviewer resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/interviewer-resumes'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const fileExt = path.extname(file.originalname).toLowerCase()
    
    if (allowedTypes.includes(fileExt)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false)
    }
  }
})

// Public routes
router.get('/', getAllInterviewers)
router.post('/apply', validate(interviewerApplicationSchema), applyToBeInterviewer)
router.post('/upload-resume', upload.single('resume'), uploadInterviewerResume)

// Protected routes
router.get('/profile', protect, getInterviewerProfile)

module.exports = router