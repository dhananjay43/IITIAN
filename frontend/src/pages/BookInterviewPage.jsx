import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterview } from '../context/InterviewContext'
import Header from '../components/common/Header'
import Calendar from '../components/ui/Calendar'
import { ChevronDown, Clock, Globe } from 'lucide-react'

function BookInterviewPage() {
  const navigate = useNavigate()
  const { setBookingData } = useInterview()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [filters, setFilters] = useState({
    interviewType: 'Internship',
    domain: 'Technical',
    profile: 'AI'
  })

  const interviewTypes = ['Internship', 'Placement']
  const domains = ['Technical', 'Non-Technical']
  const profiles = ['AI', 'Data Science', 'Software']
  const timezones = [
    '(GMT+05:30) India Standard Time',
    '(GMT+00:00) UTC',
    '(GMT-05:00) Eastern Time',
    '(GMT-08:00) Pacific Time'
  ]

  // Mock available dates - in real app this would come from API
  const availableDates = [
    new Date(2024, 6, 23), // July 23, 2024
    new Date(2024, 6, 24),
    new Date(2024, 6, 25),
    new Date(2024, 6, 26),
    new Date(2024, 6, 29),
    new Date(2024, 6, 30),
    new Date(2024, 6, 31),
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null) // Reset time slot when date changes
  }

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time)
  }

  const handleBookInterview = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select both date and time')
      return
    }

    const bookingData = {
      date: selectedDate,
      time: selectedTimeSlot,
      interviewType: filters.interviewType,
      domain: filters.domain,
      profile: filters.profile
    }

    setBookingData(bookingData)
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-primary-600 font-medium">Book Interview</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Interview</h1>
          <p className="text-gray-600">
            Select your preferences and find a time that works for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Filters */}
          <div className="space-y-6">
            {/* Interview Type */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Type</h3>
              <div className="flex space-x-2">
                {interviewTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters({ ...filters, interviewType: type })}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      filters.interviewType === type
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain</h3>
              <div className="flex space-x-2">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setFilters({ ...filters, domain })}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      filters.domain === domain
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
              <div className="flex flex-wrap gap-2">
                {profiles.map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setFilters({ ...filters, profile })}
                    className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                      filters.profile === profile
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div className="space-y-6">
            {/* Timezone Selector */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Schedule</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <div className="relative">
                  <select className="input-field appearance-none pr-10">
                    {timezones.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availableDates={availableDates}
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Available time slots for {selectedDate.toLocaleDateString()}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSlotSelect(time)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedTimeSlot === time
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleBookInterview}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Interview
                </button>
                
                {(!selectedDate || !selectedTimeSlot) && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Please select date and time to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Interview Summary */}
        {(selectedDate || selectedTimeSlot || filters.interviewType) && (
          <div className="mt-8 card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <p className="font-medium text-gray-900">{filters.interviewType}</p>
              </div>
              <div>
                <span className="text-gray-600">Domain:</span>
                <p className="font-medium text-gray-900">{filters.domain}</p>
              </div>
              <div>
                <span className="text-gray-600">Profile:</span>
                <p className="font-medium text-gray-900">{filters.profile}</p>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <p className="font-medium text-gray-900">
                  {selectedDate && selectedTimeSlot 
                    ? `${selectedDate.toLocaleDateString()} at ${selectedTimeSlot}`
                    : 'Not selected'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookInterviewPage