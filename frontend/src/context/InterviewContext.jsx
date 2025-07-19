import { createContext, useContext, useReducer } from 'react'
import { interviewService } from '../services/interviewService'

const InterviewContext = createContext()

const initialState = {
  interviews: [],
  availableSlots: [],
  selectedInterview: null,
  bookingData: null,
  isLoading: false,
  error: null
}

function interviewReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_INTERVIEWS':
      return { ...state, interviews: action.payload, isLoading: false }
    case 'SET_AVAILABLE_SLOTS':
      return { ...state, availableSlots: action.payload, isLoading: false }
    case 'SET_SELECTED_INTERVIEW':
      return { ...state, selectedInterview: action.payload }
    case 'SET_BOOKING_DATA':
      return { ...state, bookingData: action.payload }
    case 'ADD_INTERVIEW':
      return { 
        ...state, 
        interviews: [...state.interviews, action.payload],
        isLoading: false 
      }
    case 'CLEAR_BOOKING_DATA':
      return { ...state, bookingData: null, selectedInterview: null }
    default:
      return state
  }
}

export function InterviewProvider({ children }) {
  const [state, dispatch] = useReducer(interviewReducer, initialState)

  const fetchUserInterviews = async (userId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const interviews = await interviewService.getUserInterviews(userId)
      dispatch({ type: 'SET_INTERVIEWS', payload: interviews })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const fetchAvailableSlots = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const slots = await interviewService.getAvailableSlots(filters)
      dispatch({ type: 'SET_AVAILABLE_SLOTS', payload: slots })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const bookInterview = async (bookingData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const newInterview = await interviewService.bookInterview(bookingData)
      dispatch({ type: 'ADD_INTERVIEW', payload: newInterview })
      dispatch({ type: 'CLEAR_BOOKING_DATA' })
      return newInterview
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const setSelectedInterview = (interview) => {
    dispatch({ type: 'SET_SELECTED_INTERVIEW', payload: interview })
  }

  const setBookingData = (data) => {
    dispatch({ type: 'SET_BOOKING_DATA', payload: data })
  }

  const clearBookingData = () => {
    dispatch({ type: 'CLEAR_BOOKING_DATA' })
  }

  const value = {
    ...state,
    fetchUserInterviews,
    fetchAvailableSlots,
    bookInterview,
    setSelectedInterview,
    setBookingData,
    clearBookingData
  }

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  )
}

export function useInterview() {
  const context = useContext(InterviewContext)
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider')
  }
  return context
}