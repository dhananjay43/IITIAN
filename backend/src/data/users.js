const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// Mock users database
let users = [
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: bcrypt.hashSync('password123', 10), // hashed password
    phone: '+1234567890',
    college: 'Indian Institute of Technology (IIT)',
    course: 'Computer Science',
    currentYear: 3,
    graduationYear: 2025,
    linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
    preferredLanguage: 'English',
    role: 'student',
    profileCompleted: true,
    resumeUrl: null,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    phone: '+1987654321',
    college: 'National Institute of Technology (NIT)',
    course: 'Electrical Engineering',
    currentYear: 2,
    graduationYear: 2026,
    linkedinUrl: 'https://linkedin.com/in/john-doe',
    preferredLanguage: 'English',
    role: 'student',
    profileCompleted: false,
    resumeUrl: null,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
]

/**
 * User data access functions
 */
const userService = {
  // Get all users
  getAllUsers: () => users,

  // Find user by ID
  findById: (id) => users.find(user => user.id === id),

  // Find user by email
  findByEmail: (email) => users.find(user => user.email === email),

  // Create new user
  create: (userData) => {
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: 'student',
      profileCompleted: false,
      resumeUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    users.push(newUser)
    return newUser
  },

  // Update user
  update: (id, updateData) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date()
    }
    return users[userIndex]
  },

  // Delete user
  delete: (id) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  },

  // Get user statistics
  getStats: () => {
    return {
      total: users.length,
      students: users.filter(u => u.role === 'student').length,
      completedProfiles: users.filter(u => u.profileCompleted).length
    }
  }
}

module.exports = {
  users,
  userService
}