import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import { authService } from '../services/authService'

function ProfileSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [profileCompletion, setProfileCompletion] = useState(60)
  const fileInputRef = useRef(null)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const { updateProfile, user } = useAuth()
  const navigate = useNavigate()

  const watchedFields = watch()

  // Calculate profile completion based on filled fields
  const calculateCompletion = () => {
    const fields = ['name', 'email', 'phone', 'college', 'course', 'currentYear', 'graduationYear', 'linkedinUrl', 'preferredLanguage']
    const filledFields = fields.filter(field => watchedFields[field]?.trim()).length
    const fileUploaded = uploadedFile ? 1 : 0
    return Math.round(((filledFields + fileUploaded) / (fields.length + 1)) * 100)
  }

  const colleges = [
    'Select your college',
    'Indian Institute of Technology (IIT)',
    'Indian Institute of Management (IIM)',
    'National Institute of Technology (NIT)',
    'Birla Institute of Technology and Science (BITS)',
    'Delhi University',
    'Mumbai University',
    'Other'
  ]

  const languages = [
    'Select your language',
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Marathi',
    'Gujarati',
    'Kannada'
  ]

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      
      // Upload resume if selected
      if (uploadedFile) {
        await authService.uploadResume(uploadedFile)
      }

      // Update profile
      await updateProfile(data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Profile update failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or DOC file')
        return
      }

      if (file.size > maxSize) {
        alert('File size must be less than 10MB')
        return
      }

      setUploadedFile(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 mb-6">
              Fill in your details to get the most out of our platform.
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm font-medium text-primary-600">{calculateCompletion()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                  placeholder="Enter your full name"
                  defaultValue={user?.name || ''}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-gray-400">(edu preferred)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="e.g., your.name@university.edu"
                  defaultValue={user?.email || ''}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="flex">
                  <input
                    id="phone"
                    type="tel"
                    className={`input-field ${errors.phone ? 'border-red-300' : ''}`}
                    placeholder="Enter your phone number"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  <button
                    type="button"
                    className="ml-3 btn-secondary px-4 py-2 text-sm"
                  >
                    Verify
                  </button>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-2">
                  College
                </label>
                <select
                  id="college"
                  className={`input-field ${errors.college ? 'border-red-300' : ''}`}
                  {...register('college', { required: 'Please select your college' })}
                >
                  {colleges.map((college, index) => (
                    <option key={index} value={index === 0 ? '' : college}>
                      {college}
                    </option>
                  ))}
                </select>
                {errors.college && (
                  <p className="mt-1 text-sm text-red-600">{errors.college.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <input
                  id="course"
                  type="text"
                  className={`input-field ${errors.course ? 'border-red-300' : ''}`}
                  placeholder="e.g., Computer Science"
                  {...register('course', { required: 'Course is required' })}
                />
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Year
                </label>
                <input
                  id="currentYear"
                  type="number"
                  min="1"
                  max="6"
                  className={`input-field ${errors.currentYear ? 'border-red-300' : ''}`}
                  placeholder="e.g., 3"
                  {...register('currentYear', { required: 'Current year is required' })}
                />
                {errors.currentYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentYear.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year
                </label>
                <input
                  id="graduationYear"
                  type="number"
                  min="2024"
                  max="2030"
                  className={`input-field ${errors.graduationYear ? 'border-red-300' : ''}`}
                  placeholder="e.g., 2025"
                  {...register('graduationYear', { required: 'Graduation year is required' })}
                />
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.graduationYear.message}</p>
                )}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
                onClick={triggerFileUpload}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <FileText className="w-12 h-12 text-green-500 mb-4" />
                    <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-sm font-medium text-primary-600 mb-2">Upload a file</p>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  id="linkedinUrl"
                  type="url"
                  className="input-field"
                  placeholder="https://www.linkedin.com/in/..."
                  {...register('linkedinUrl')}
                />
              </div>

              <div>
                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <select
                  id="preferredLanguage"
                  className="input-field"
                  {...register('preferredLanguage')}
                >
                  {languages.map((language, index) => (
                    <option key={index} value={index === 0 ? '' : language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary px-8 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving Profile...
                  </div>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetupPage