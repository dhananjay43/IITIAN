const { userService } = require('../data/users')

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id
    const updateData = req.body

    const updatedUser = userService.update(userId, {
      ...updateData,
      profileCompleted: true
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    // Remove password from response
    const userResponse = { ...updatedUser }
    delete userResponse.password

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: userResponse
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Upload user resume
 * @route   POST /api/users/upload-resume
 * @access  Private
 */
const uploadResume = async (req, res, next) => {
  try {
    const userId = req.user.id

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`
    
    const updatedUser = userService.update(userId, { resumeUrl })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

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
 * @desc    Delete user account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id

    const deleted = userService.delete(userId)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User account deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateProfile,
  uploadResume,
  deleteUser
}