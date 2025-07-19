import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null }
    case 'AUTH_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      }
    case 'AUTH_ERROR':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: action.payload 
      }
    case 'AUTH_LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: null 
      }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const user = await authService.getProfile()
          dispatch({ type: 'AUTH_SUCCESS', payload: user })
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: null })
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: null })
        localStorage.removeItem('token')
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.login(credentials)
      localStorage.setItem('token', response.token)
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user })
      return response
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message })
      throw error
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.register(userData)
      localStorage.setItem('token', response.token)
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user })
      return response
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData)
      dispatch({ type: 'UPDATE_PROFILE', payload: updatedUser })
      return updatedUser
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message })
      throw error
    }
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}