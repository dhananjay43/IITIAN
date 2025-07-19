const { v4: uuidv4 } = require('uuid')

// Mock interviews database
let interviews = [
  {
    id: uuidv4(),
    userId: null, // Will be set when user books
    interviewerId: uuidv4(),
    interviewerName: 'John Doe',
    interviewerCompany: 'Tech Solutions Inc.',
    type: 'Technical',
    domain: 'Technical',
    profile: 'Software',
    date: new Date('2024-07-25'),
    time: '2:00 PM',
    duration: 60, // minutes
    status: 'upcoming', // upcoming, completed, cancelled
    meetingLink: 'https://meet.google.com/mock-interview-1',
    price: 50.00,
    paymentStatus: 'paid',
    feedback: null,
    rating: null,
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: uuidv4(),
    userId: null,
    interviewerId: uuidv4(),
    interviewerName: 'Jane Smith',
    interviewerCompany: 'Innovate Corp',
    type: 'Behavioral',
    domain: 'Non-Technical',
    profile: 'AI',
    date: new Date('2024-07-28'),
    time: '10:00 AM',
    duration: 45,
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/mock-interview-2',
    price: 45.00,
    paymentStatus: 'pending',
    feedback: null,
    rating: null,
    createdAt: new Date('2024-07-22'),
    updatedAt: new Date('2024-07-22')
  }
]

// Mock available interview slots
let availableSlots = [
  {
    id: uuidv4(),
    interviewerId: uuidv4(),
    interviewerName: 'Jane Smith',
    interviewerCompany: 'Google',
    interviewerAvatar: '/api/placeholder/40/40',
    date: new Date('2024-07-29'),
    time: '11:00 AM',
    duration: 60,
    price: 60.00,
    type: 'Technical',
    domain: 'Technical',
    profile: 'Software',
    available: true
  },
  {
    id: uuidv4(),
    interviewerId: uuidv4(),
    interviewerName: 'Mark Johnson',
    interviewerCompany: 'Amazon',
    interviewerAvatar: '/api/placeholder/40/40',
    date: new Date('2024-07-30'),
    time: '3:00 PM',
    duration: 45,
    price: 55.00,
    type: 'Technical',
    domain: 'Technical',
    profile: 'AI',
    available: true
  },
  {
    id: uuidv4(),
    interviewerId: uuidv4(),
    interviewerName: 'Emily Chen',
    interviewerCompany: 'Netflix',
    interviewerAvatar: '/api/placeholder/40/40',
    date: new Date('2024-07-31'),
    time: '9:00 AM',
    duration: 60,
    price: 70.00,
    type: 'Behavioral',
    domain: 'Non-Technical',
    profile: 'Data Science',
    available: true
  },
  {
    id: uuidv4(),
    interviewerId: uuidv4(),
    interviewerName: 'David Lee',
    interviewerCompany: 'Meta',
    interviewerAvatar: '/api/placeholder/40/40',
    date: new Date('2024-08-01'),
    time: '1:00 PM',
    duration: 60,
    price: 65.00,
    type: 'Technical',
    domain: 'Technical',
    profile: 'Software',
    available: true
  }
]

/**
 * Interview data access functions
 */
const interviewService = {
  // Get all interviews
  getAllInterviews: () => interviews,

  // Get interviews by user ID
  getByUserId: (userId) => interviews.filter(interview => interview.userId === userId),

  // Find interview by ID
  findById: (id) => interviews.find(interview => interview.id === id),

  // Create new interview booking
  create: (interviewData) => {
    const newInterview = {
      id: uuidv4(),
      ...interviewData,
      status: 'upcoming',
      paymentStatus: 'paid',
      meetingLink: `https://meet.google.com/mock-interview-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    interviews.push(newInterview)

    // Remove from available slots if it was booked
    const slotIndex = availableSlots.findIndex(slot => 
      slot.interviewerId === interviewData.interviewerId &&
      slot.date.toDateString() === new Date(interviewData.date).toDateString() &&
      slot.time === interviewData.time
    )
    if (slotIndex !== -1) {
      availableSlots[slotIndex].available = false
    }

    return newInterview
  },

  // Update interview
  update: (id, updateData) => {
    const interviewIndex = interviews.findIndex(interview => interview.id === id)
    if (interviewIndex === -1) return null

    interviews[interviewIndex] = {
      ...interviews[interviewIndex],
      ...updateData,
      updatedAt: new Date()
    }
    return interviews[interviewIndex]
  },

  // Cancel interview
  cancel: (id) => {
    const interview = interviews.find(i => i.id === id)
    if (!interview) return false

    interview.status = 'cancelled'
    interview.updatedAt = new Date()

    // Make slot available again if cancelled
    const slot = availableSlots.find(s => 
      s.interviewerId === interview.interviewerId &&
      s.date.toDateString() === interview.date.toDateString() &&
      s.time === interview.time
    )
    if (slot) {
      slot.available = true
    }

    return true
  },

  // Get available slots with filters
  getAvailableSlots: (filters = {}) => {
    let slots = availableSlots.filter(slot => slot.available)

    if (filters.type) {
      slots = slots.filter(slot => slot.type === filters.type)
    }
    if (filters.domain) {
      slots = slots.filter(slot => slot.domain === filters.domain)
    }
    if (filters.profile) {
      slots = slots.filter(slot => slot.profile === filters.profile)
    }
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString()
      slots = slots.filter(slot => slot.date.toDateString() === filterDate)
    }

    return slots
  },

  // Add feedback to interview
  addFeedback: (id, feedback, rating) => {
    const interview = interviews.find(i => i.id === id)
    if (!interview) return false

    interview.feedback = feedback
    interview.rating = rating
    interview.status = 'completed'
    interview.updatedAt = new Date()

    return true
  },

  // Get interview statistics
  getStats: () => {
    return {
      total: interviews.length,
      upcoming: interviews.filter(i => i.status === 'upcoming').length,
      completed: interviews.filter(i => i.status === 'completed').length,
      cancelled: interviews.filter(i => i.status === 'cancelled').length,
      totalRevenue: interviews
        .filter(i => i.paymentStatus === 'paid')
        .reduce((sum, i) => sum + i.price, 0)
    }
  }
}

module.exports = {
  interviews,
  availableSlots,
  interviewService
}