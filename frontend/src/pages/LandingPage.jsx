import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { MessageSquare, Users, Trophy, Star, ArrowRight } from 'lucide-react'

function LandingPage() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Realistic Mock Interviews',
      description: 'Experience real interview scenarios with industry professionals.'
    },
    {
      icon: Users,
      title: 'Personalized Feedback',
      description: 'Receive detailed feedback on your performance to identify areas for improvement.'
    },
    {
      icon: Trophy,
      title: 'Community Support',
      description: 'Connect with peers and mentors for guidance and support.'
    }
  ]

  const successStories = [
    {
      name: "Sarah's Journey to Success",
      image: "/api/placeholder/300/200",
      description: "Sarah, a computer science major, landed her dream internship at a tech company after practicing mock interviews on our platform.",
      highlight: "Dream internship at a tech company"
    },
    {
      name: "David's Interview Transformation",
      image: "/api/placeholder/300/200", 
      description: "David, a business student, significantly improved his interview skills and secured a placement at a top consulting firm.",
      highlight: "Placement at top consulting firm"
    },
    {
      name: "Teamwork Makes the Dream Work",
      image: "/api/placeholder/300/200",
      description: "Our platform fostered a collaborative environment where students supported each other, leading to collective success.",
      highlight: "Collaborative learning environment"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Ace Your Interviews with
                <span className="text-primary-600 block">Confidence</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Practice with realistic mock interviews and get personalized feedback to land
                your dream internship or placement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-600">Interview Practice Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a comprehensive suite of tools to help you excel in your interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="card text-center group hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who have landed their dream jobs with our help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="card group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {story.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {story.description}
                </p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Success Story</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join thousands of students who have improved their interview skills and landed their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/become-interviewer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Become an Interviewer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage