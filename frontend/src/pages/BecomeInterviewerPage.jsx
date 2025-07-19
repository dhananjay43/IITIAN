import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { interviewService } from '../services/interviewService'

function BecomeInterviewerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const fileInputRef = useRef(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      
      // Upload resume if selected
      if (uploadedFile) {
        await interviewService.uploadInterviewerResume(uploadedFile)
      }

      // Submit application
      await interviewService.applyInterviewer({
        ...data,
        resumeUploaded: !!uploadedFile
      })

      setSubmitSuccess(true)
      reset()
      setUploadedFile(null)
      
      // Auto redirect after success
      setTimeout(() => {
        navigate('/')
      }, 3000)

    } catch (error) {
      console.error('Application submission failed:', error)
      alert('Application submission failed. Please try again.')
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full text-center">
            <div className="card">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in becoming an interviewer. We'll review your application and get back to you within 3-5 business days.
              </p>
              <button
                onClick={() => navigate('/')}
                className="btn-primary w-full py-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become an Interviewer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our platform and help students prepare for their future careers.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`input-field ${errors.fullName ? 'border-red-300' : ''}`}
                  placeholder="e.g., Jane Doe"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="e.g., jane.doe@example.com"
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

            {/* LinkedIn Profile */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile URL
              </label>
              <input
                id="linkedinUrl"
                type="url"
                className={`input-field ${errors.linkedinUrl ? 'border-red-300' : ''}`}
                placeholder="https://linkedin.com/in/yourprofile"
                {...register('linkedinUrl', { 
                  required: 'LinkedIn profile is required',
                  pattern: {
                    value: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
                    message: 'Please enter a valid LinkedIn URL'
                  }
                })}
              />
              {errors.linkedinUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>
              )}
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  className={`input-field ${errors.company ? 'border-red-300' : ''}`}
                  placeholder="e.g., Acme Inc."
                  {...register('company', { required: 'Company is required' })}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  className={`input-field ${errors.designation ? 'border-red-300' : ''}`}
                  placeholder="e.g., Senior Software Engineer"
                  {...register('designation', { required: 'Designation is required' })}
                />
                {errors.designation && (
                  <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  type="number"
                  min="1"
                  max="50"
                  className={`input-field ${errors.experience ? 'border-red-300' : ''}`}
                  placeholder="e.g., 5"
                  {...register('experience', { 
                    required: 'Years of experience is required',
                    min: {
                      value: 1,
                      message: 'Minimum 1 year of experience required'
                    }
                  })}
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (USD)
                </label>
                <input
                  id="hourlyRate"
                  type="number"
                  min="10"
                  max="500"
                  className={`input-field ${errors.hourlyRate ? 'border-red-300' : ''}`}
                  placeholder="e.g., 50"
                  {...register('hourlyRate', { 
                    required: 'Hourly rate is required',
                    min: {
                      value: 10,
                      message: 'Minimum rate is $10/hour'
                    }
                  })}
                />
                {errors.hourlyRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
                )}
              </div>
            </div>

            {/* Expertise Domains */}
            <div>
              <label htmlFor="expertiseDomains" className="block text-sm font-medium text-gray-700 mb-2">
                Expertise Domains
              </label>
              <textarea
                id="expertiseDomains"
                rows={4}
                className={`input-field ${errors.expertiseDomains ? 'border-red-300' : ''}`}
                placeholder="e.g., Frontend Development, System Design, Algorithms"
                {...register('expertiseDomains', { required: 'Please list your areas of expertise' })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Please list your areas of expertise, separated by commas.
              </p>
              {errors.expertiseDomains && (
                <p className="mt-1 text-sm text-red-600">{errors.expertiseDomains.message}</p>
              )}
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume/CV Upload
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

            {/* Availability Schedule */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability Schedule
              </label>
              <textarea
                id="availability"
                rows={3}
                className={`input-field ${errors.availability ? 'border-red-300' : ''}`}
                placeholder="e.g., Monday 6pm-9pm EST, Saturday 10am-2pm EST"
                {...register('availability', { required: 'Please provide your availability' })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Let us know your general availability. You'll be able to set specific times later.
              </p>
              {errors.availability && (
                <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                  {...register('terms', { required: 'You must agree to the terms' })}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the interviewer{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </a>{' '}
                  and confirm that all information provided is accurate.
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
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
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BecomeInterviewerPage