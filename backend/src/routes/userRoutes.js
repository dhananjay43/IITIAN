const express = require('express')
const multer = require('multer')
const path = require('path')
const { 
  updateProfile,
  uploadResume,
  deleteUser
} = require('../controllers/userController')
const { protect } = require('../middleware/auth')
const { validate, profileUpdateSchema } = require('../middleware/validation')

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/resumes'))
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
    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const fileExt = path.extname(file.originalname).toLowerCase()
    
    if (allowedTypes.includes(fileExt)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false)
    }
  }
})

// All routes require authentication
router.use(protect)

// Profile management
router.put('/profile', validate(profileUpdateSchema), updateProfile)
router.post('/upload-resume', upload.single('resume'), uploadResume)
router.delete('/profile', deleteUser)

module.exports = router