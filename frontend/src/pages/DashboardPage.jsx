import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useInterview } from '../context/InterviewContext'
import Header from '../components/common/Header'
import { 
  Calendar, 
  Eye, 
  CheckCircle, 
  Clock, 
  User, 
  ArrowRight,
  Monitor,
  MessageSquare,
  BookOpen,
  Users
} from 'lucide-react'

function DashboardPage() {
  const { user } = useAuth()
  const { interviews, fetchUserInterviews, isLoading } = useInterview()
  const [activeTab, setActiveTab] = useState('upcoming')

  useEffect(() => {
    if (user?.id) {
      fetchUserInterviews(user.id)
    }
  }, [user])

  const mockInterviews = [
    {
      id: 1,
      title: 'Mock Interview with Tech Solutions Inc.',
      date: 'July 25, 2024',
      time: '2:00 PM',
      status: 'upcoming',
      type: 'Technical',
      interviewer: 'John Doe',
      company: 'Tech Solutions Inc.'
    },
    {
      id: 2,
      title: 'Behavioral Interview with Innovate Corp',
      date: 'July 28, 2024',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'Behavioral',
      interviewer: 'Jane Smith',
      company: 'Innovate Corp'
    }
  ]

  const mockFeedback = {
    interviewer: 'John Doe',
    company: 'Tech Solutions Inc.',
    feedback: 'Sarah demonstrated strong problem-solving skills but could improve on articulating her thought process more clearly. Her STAR method for behavioral questions was excellent. A great candidate overall.',
    rating: 4.5
  }

  const availableSlots = [
    {
      id: 1,
      interviewer: 'Jane Smith',
      company: 'Google',
      date: 'July 29',
      time: '11:00 AM',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      interviewer: 'Mark Johnson',
      company: 'Amazon',
      date: 'July 30',
      time: '3:00 PM',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      interviewer: 'Emily Chen',
      company: 'Netflix',
      date: 'July 31',
      time: '9:00 AM',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      interviewer: 'David Lee',
      company: 'Meta',
      date: 'August 1',
      time: '1:00 PM',
      avatar: '/api/placeholder/40/40'
    }
  ]

  const quickActions = [
    {
      title: 'Book an Interview',
      description: 'Schedule your next mock interview',
      icon: Calendar,
      href: '/book-interview',
      color: 'bg-primary-500'
    },
    {
      title: 'View Upcoming Interviews',
      description: 'See your scheduled interviews',
      icon: Eye,
      href: '/interviews',
      color: 'bg-green-500'
    }
  ]

  const getProfileCompletion = () => {
    // Mock calculation - in real app this would come from user data
    return 85
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'Sarah'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your dashboard overview for today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Interviews */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Interviews</h2>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'upcoming'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'past'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Past
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {mockInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{interview.title}</h3>
                          <p className="text-sm text-gray-600">{interview.date}, {interview.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {activeTab === 'upcoming' ? (
                          <button className="btn-primary text-sm px-4 py-2">
                            Join Now
                          </button>
                        ) : (
                          <button className="btn-secondary text-sm px-4 py-2">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlighted Feedback */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Highlighted Feedback</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        Feedback from {mockFeedback.company}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i < Math.floor(mockFeedback.rating)
                                ? 'bg-yellow-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Interviewer: {mockFeedback.interviewer}
                    </p>
                    <p className="text-gray-800 mb-4">
                      "{mockFeedback.feedback}"
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Full Feedback →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Interview Slots */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Interview Slots</h2>
                <Link
                  to="/book-interview"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                >
                  View More Slots
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSlots.map((slot) => (
                  <div key={slot.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{slot.interviewer}</p>
                          <p className="text-sm text-gray-600">{slot.company}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {slot.date}, {slot.time}
                      </div>
                      <button className="btn-primary text-sm px-4 py-2">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - getProfileCompletion() / 100)}`}
                      className="text-primary-600"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {getProfileCompletion()}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">
                Great job! Just a few more steps to stand out.
              </p>
              <Link
                to="/profile-setup"
                className="w-full btn-primary text-sm py-2 text-center block"
              >
                Complete Profile
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <Link
                      key={index}
                      to={action.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 group-hover:text-primary-600">
                          {action.title}
                        </p>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage