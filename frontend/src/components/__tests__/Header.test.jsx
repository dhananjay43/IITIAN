import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Header from '../common/Header'

// Mock the auth context for testing
const MockAuthProvider = ({ children, isAuthenticated = false, user = null }) => {
  const mockValue = {
    user,
    isAuthenticated,
    isLoading: false,
    error: null,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    updateProfile: jest.fn()
  }

  return (
    <AuthProvider value={mockValue}>
      {children}
    </AuthProvider>
  )
}

const renderHeader = (isAuthenticated = false, user = null) => {
  return render(
    <BrowserRouter>
      <MockAuthProvider isAuthenticated={isAuthenticated} user={user}>
        <Header />
      </MockAuthProvider>
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  it('renders logo and brand name', () => {
    renderHeader()
    
    expect(screen.getByText('MockInterviewPrep')).toBeInTheDocument()
  })

  it('shows login and register buttons when not authenticated', () => {
    renderHeader(false)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('shows user name and logout when authenticated', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    renderHeader(true, mockUser)
    
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByTitle('Logout')).toBeInTheDocument()
  })

  it('shows navigation items', () => {
    renderHeader()
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows protected navigation when authenticated', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    renderHeader(true, mockUser)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Practice')).toBeInTheDocument()
  })
})