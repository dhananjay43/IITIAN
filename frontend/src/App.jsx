import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { InterviewProvider } from './context/InterviewContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfileSetupPage from './pages/ProfileSetupPage'
import DashboardPage from './pages/DashboardPage'
import BookInterviewPage from './pages/BookInterviewPage'
import PaymentPage from './pages/PaymentPage'
import BecomeInterviewerPage from './pages/BecomeInterviewerPage'

// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/become-interviewer" element={<BecomeInterviewerPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile-setup" element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/book-interview" element={
                <ProtectedRoute>
                  <BookInterviewPage />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App