import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut, User, Bell } from 'lucide-react'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navigation = [
    { name: 'Home', href: '/', public: true },
    { name: 'About', href: '/about', public: true },
    { name: 'Contact', href: '/contact', public: true },
    { name: 'Dashboard', href: '/dashboard', protected: true },
    { name: 'Practice', href: '/practice', protected: true },
    { name: 'Resources', href: '/resources', protected: true },
    { name: 'Community', href: '/community', protected: true },
  ]

  const visibleNav = navigation.filter(item => 
    item.public || (item.protected && isAuthenticated)
  )

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                MockInterviewPrep
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-5 h-5" />
                </button>
                
                {/* User Menu */}
                <div className="relative flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name || 'Profile'}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header