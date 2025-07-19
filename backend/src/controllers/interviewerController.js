const { v4: uuidv4 } = require('uuid')

// Mock interviewer applications storage
let interviewerApplications = []
let interviewers = [
  {
    id: uuidv4(),
    name: 'Jane Smith',
    company: 'Google',
    designation: 'Senior Software Engineer',
    experience: 8,
    hourlyRate: 75,
    domains: ['System Design', 'Algorithms', 'JavaScript'],
    rating: 4.9,
    totalInterviews: 150,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: uuidv4(),
    name: 'Mark Johnson',
    company: 'Amazon',
    designation: 'Principal Engineer',
    experience: 12,
    hourlyRate: 90,
    domains: ['Machine Learning', 'Python', 'Data Structures'],
    rating: 4.8,
    totalInterviews: 200,
    avatar: '/api/placeholder/40/40'
  }
]

/**
 * @desc    Get all interviewers
 * @route   GET /api/interviewers
 * @access  Public
 */
const getAllInterviewers = async (req, res, next) => {
  try {
    const { domain, experience, rating } = req.query
    let filteredInterviewers = [...interviewers]

    if (domain) {
      filteredInterviewers = filteredInterviewers.filter(interviewer =>
        interviewer.domains.some(d => d.toLowerCase().includes(domain.toLowerCase()))
      )
    }

    if (experience) {
      filteredInterviewers = filteredInterviewers.filter(interviewer =>
        interviewer.experience >= parseInt(experience)
      )
    }

    if (rating) {
      filteredInterviewers = filteredInterviewers.filter(interviewer =>
        interviewer.rating >= parseFloat(rating)
      )
    }

    res.status(200).json({
      success: true,
      count: filteredInterviewers.length,
      data: filteredInterviewers
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Apply to become an interviewer
 * @route   POST /api/interviewers/apply
 * @access  Public
 */
const applyToBeInterviewer = async (req, res, next) => {
  try {
    const applicationData = {
      id: uuidv4(),
      ...req.body,
      status: 'pending',
      appliedAt: new Date(),
      reviewedAt: null,
      reviewNotes: null
    }

    interviewerApplications.push(applicationData)

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: applicationData.id,
        status: applicationData.status
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Upload interviewer resume
 * @route   POST /api/interviewers/upload-resume
 * @access  Public
 */
const uploadInterviewerResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    const resumeUrl = `/uploads/interviewer-resumes/${req.file.filename}`

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        resumeUrl: resumeUrl
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get interviewer profile
 * @route   GET /api/interviewers/profile
 * @access  Private
 */
const getInterviewerProfile = async (req, res, next) => {
  try {
    // In a real app, this would get the interviewer profile from database
    // For demo, we'll return mock data
    const interviewerProfile = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      company: 'Mock Company',
      designation: 'Senior Engineer',
      experience: 5,
      hourlyRate: 60,
      domains: ['JavaScript', 'React', 'Node.js'],
      rating: 4.7,
      totalInterviews: 75,
      earnings: 4500,
      availability: 'Monday-Friday 6PM-10PM EST'
    }

    res.status(200).json({
      success: true,
      data: interviewerProfile
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get interviewer applications (admin only)
 * @route   GET /api/interviewers/applications
 * @access  Private (Admin)
 */
const getApplications = async (req, res, next) => {
  try {
    const { status } = req.query
    let applications = [...interviewerApplications]

    if (status) {
      applications = applications.filter(app => app.status === status)
    }

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Review interviewer application (admin only)
 * @route   PUT /api/interviewers/applications/:id/review
 * @access  Private (Admin)
 */
const reviewApplication = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status, reviewNotes } = req.body

    const applicationIndex = interviewerApplications.findIndex(app => app.id === id)
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      })
    }

    interviewerApplications[applicationIndex] = {
      ...interviewerApplications[applicationIndex],
      status,
      reviewNotes,
      reviewedAt: new Date()
    }

    // If approved, add to interviewers list
    if (status === 'approved') {
      const application = interviewerApplications[applicationIndex]
      const newInterviewer = {
        id: uuidv4(),
        name: application.fullName,
        company: application.company,
        designation: application.designation,
        experience: application.experience,
        hourlyRate: application.hourlyRate,
        domains: application.expertiseDomains.split(',').map(d => d.trim()),
        rating: 0,
        totalInterviews: 0,
        avatar: '/api/placeholder/40/40'
      }
      interviewers.push(newInterviewer)
    }

    res.status(200).json({
      success: true,
      message: 'Application reviewed successfully',
      data: interviewerApplications[applicationIndex]
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllInterviewers,
  applyToBeInterviewer,
  uploadInterviewerResume,
  getInterviewerProfile,
  getApplications,
  reviewApplication
}