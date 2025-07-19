import api from './api'

export const interviewService = {
  // Get available interview slots
  async getAvailableSlots(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/interviews/available?${params}`)
    return response
  },

  // Get user's interviews
  async getUserInterviews(userId) {
    const response = await api.get(`/interviews/user/${userId}`)
    return response
  },

  // Book an interview
  async bookInterview(bookingData) {
    const response = await api.post('/interviews/book', bookingData)
    return response
  },

  // Get available interviewers
  async getInterviewers(filters = {}) {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/interviewers?${params}`)
    return response
  },

  // Apply to become interviewer
  async applyInterviewer(applicationData) {
    const response = await api.post('/interviewers/apply', applicationData)
    return response
  },

  // Upload interviewer resume
  async uploadInterviewerResume(file) {
    const formData = new FormData()
    formData.append('resume', file)
    
    const response = await api.post('/interviewers/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  },

  // Get interview feedback
  async getInterviewFeedback(interviewId) {
    const response = await api.get(`/interviews/${interviewId}/feedback`)
    return response
  }
}