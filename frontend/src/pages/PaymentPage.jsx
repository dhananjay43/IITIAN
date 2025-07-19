import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterview } from '../context/InterviewContext'
import Header from '../components/common/Header'
import { CreditCard, Shield, Check } from 'lucide-react'

function PaymentPage() {
  const navigate = useNavigate()
  const { bookingData, bookInterview, clearBookingData } = useInterview()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [couponCode, setCouponCode] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock data - would come from bookingData in real app
  const bookingSummary = {
    interviewType: bookingData?.interviewType || 'Technical Interview',
    date: bookingData?.date?.toLocaleDateString() || 'July 20, 2024',
    time: bookingData?.time || '10:00 AM',
    interviewer: 'Dr. Eleanor Vance',
    duration: '60 minutes',
    price: 50.00
  }

  const applyCoupon = () => {
    // Mock coupon application
    console.log('Applying coupon:', couponCode)
  }

  const handlePayment = async () => {
    try {
      setIsProcessing(true)
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock booking the interview
      const interviewData = {
        ...bookingData,
        paymentMethod,
        amount: bookingSummary.price,
        interviewer: bookingSummary.interviewer
      }
      
      await bookInterview(interviewData)
      
      // Clear booking data and redirect to success
      clearBookingData()
      navigate('/dashboard?booking=success')
      
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGoBack = () => {
    navigate('/book-interview')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Dashboard</span>
          <span>/</span>
          <span>Profile</span>
          <span>/</span>
          <span className="text-primary-600 font-medium">Payment</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interview Type</span>
                  <span className="font-medium text-gray-900">{bookingSummary.interviewType}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="font-medium text-gray-900">{bookingSummary.date}, {bookingSummary.time}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Interviewer</span>
                  <span className="font-medium text-gray-900">{bookingSummary.interviewer}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">{bookingSummary.duration}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${bookingSummary.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Payment Details</h1>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex items-center">
                      <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">Credit Card</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors opacity-50">
                    <input
                      type="radio"
                      name="payment-method"
                      value="paypal"
                      disabled
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <span className="font-medium text-gray-900">PayPal</span>
                      <span className="ml-2 text-sm text-gray-500">(Coming Soon)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit-card' && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coupon Code */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="input-field flex-1"
                  />
                  <button
                    onClick={applyCoupon}
                    className="btn-secondary px-6 py-2 text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">
                      Secure Payment
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="mb-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    By clicking 'Pay Now', you agree to our{' '}
                    <a href="/terms" className="text-primary-600 hover:text-primary-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleGoBack}
                  className="flex-1 btn-secondary py-3 text-base font-medium"
                >
                  Go Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage