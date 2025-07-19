import api from './api'

export const authService = {
  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response
  },

  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response
  },

  // Get user profile
  async getProfile() {
    const response = await api.get('/auth/profile')
    return response
  },

  // Update user profile
  async updateProfile(profileData) {
    const response = await api.put('/users/profile', profileData)
    return response
  },

  // Upload resume
  async uploadResume(file) {
    const formData = new FormData()
    formData.append('resume', file)
    
    const response = await api.post('/users/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  },

  // Google OAuth (placeholder for implementation)
  async googleLogin(token) {
    const response = await api.post('/auth/google', { token })
    return response
  }
}