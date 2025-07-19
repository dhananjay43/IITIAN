# MockInterviewPrep Frontend

Modern React application for booking and managing mock interviews, built with Vite and Tailwind CSS.

## Features

- **User Authentication** - Login/Register with JWT integration
- **Profile Management** - Complete user profiles with resume upload
- **Interview Booking** - Interactive calendar for scheduling interviews  
- **Dashboard** - Track upcoming interviews and progress
- **Payment Integration** - Secure payment flow for bookings
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Form Validation** - React Hook Form with comprehensive validation
- **State Management** - Context API for global state
- **Component Testing** - Jest + React Testing Library

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Forms with validation
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components (Header, Footer)
│   │   ├── forms/         # Form components
│   │   ├── ui/           # UI primitives (Calendar, etc.)
│   │   └── __tests__/    # Component tests
│   ├── pages/            # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── InterviewContext.jsx
│   ├── services/         # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── interviewService.js
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── assets/          # Images, fonts, etc.
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:3001

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_APP_NAME=MockInterviewPrep
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:5173

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run tests
npm test
```

## Application Pages

### 1. Landing Page (`/`)
- Hero section with value proposition
- Key features showcase
- Success stories
- Call-to-action buttons

### 2. Authentication Pages
- **Login** (`/login`) - User login with email/password
- **Register** (`/register`) - New user registration

### 3. Profile Setup (`/profile-setup`)
- Multi-step profile completion
- Personal and academic information
- Resume upload functionality
- Progress tracking

### 4. Dashboard (`/dashboard`)
- Upcoming interviews overview
- Profile completion status
- Quick actions (book interview, view feedback)
- Available interview slots

### 5. Book Interview (`/book-interview`)
- Interview type selection (Technical/Behavioral)
- Interactive calendar component
- Time slot selection
- Booking summary

### 6. Payment (`/payment`)
- Booking details summary
- Payment method selection
- Secure payment processing
- Confirmation flow

### 7. Become Interviewer (`/become-interviewer`)
- Interviewer application form
- Professional details and experience
- Resume upload for interviewers
- Application submission

## Components

### Layout Components

**Header** (`components/common/Header.jsx`)
- Navigation menu
- Authentication status
- User profile access
- Responsive design

**Footer** (`components/common/Footer.jsx`)
- Company information
- Quick links
- Social media links

### UI Components

**Calendar** (`components/ui/Calendar.jsx`)
- Interactive date picker
- Available date highlighting
- Month navigation
- Date selection handling

### Form Components
- Input validation
- Error messaging
- File upload handling
- Responsive layouts

## State Management

### Context API Implementation

**AuthContext** - User authentication state
```javascript
const { user, isAuthenticated, login, logout, updateProfile } = useAuth()
```

**InterviewContext** - Interview booking state  
```javascript
const { interviews, bookInterview, availableSlots } = useInterview()
```

### Why Context API over Redux

We chose Context API because:
- **Simpler setup** for medium-sized applications
- **Built into React** - no additional dependencies
- **Sufficient complexity** for our authentication and booking needs
- **Easier learning curve** for team members
- **Better performance** for our use case

## API Integration

### Service Layer Architecture

**API Client** (`services/api.js`)
- Axios configuration
- Request/response interceptors
- Authentication token handling
- Error handling

**Auth Service** (`services/authService.js`)
```javascript
import { authService } from './services/authService'

// Login user
const response = await authService.login({ email, password })

// Update profile
await authService.updateProfile(profileData)
```

**Interview Service** (`services/interviewService.js`)
```javascript
import { interviewService } from './services/interviewService'

// Get available slots
const slots = await interviewService.getAvailableSlots(filters)

// Book interview
await interviewService.bookInterview(bookingData)
```

## Styling

### Tailwind CSS Configuration

Custom design system with:
- **Primary colors** - Blue palette for branding
- **Typography** - Inter font family
- **Spacing** - Extended spacing scale
- **Components** - Pre-built component classes

### Component Classes

```css
/* Buttons */
.btn-primary { @apply bg-primary-600 hover:bg-primary-700 text-white... }
.btn-secondary { @apply bg-gray-100 hover:bg-gray-200 text-gray-900... }

/* Form inputs */
.input-field { @apply w-full px-3 py-2 border border-gray-300 rounded-lg... }

/* Cards */
.card { @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6; }
```

### Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid layouts** with responsive columns
- **Typography scaling** across devices

## Form Validation

### React Hook Form Integration

```javascript
import { useForm } from 'react-hook-form'

const { register, handleSubmit, formState: { errors } } = useForm()

// Email validation
{...register('email', {
  required: 'Email is required',
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Please enter a valid email address'
  }
})}
```

### Validation Rules

- **Email** - Valid email format
- **Password** - Minimum 6 characters, complexity requirements
- **Phone** - Valid phone number format
- **File uploads** - Type and size validation
- **Required fields** - Comprehensive field validation

## Testing

### Test Setup

- **Jest** - Test runner
- **React Testing Library** - Component testing utilities
- **User Event** - User interaction simulation

### Test Categories

**Component Tests**
```javascript
// Header component test
it('renders navigation items', () => {
  render(<Header />)
  expect(screen.getByText('Home')).toBeInTheDocument()
})
```

**Integration Tests**
- Authentication flow
- Form submission
- API integration

**Accessibility Tests**
- Screen reader compatibility
- Keyboard navigation
- ARIA attributes

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Performance Optimization

### Code Splitting
- Route-based splitting
- Component lazy loading
- Bundle size optimization

### Image Optimization
- Responsive images
- Lazy loading
- WebP format support

### Caching Strategy
- API response caching
- Local storage for user preferences
- Service worker for offline support

## Accessibility

### WCAG 2.1 Compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios
- **Focus management**
- **ARIA labels** and descriptions

### Implementation
```jsx
// Accessible button
<button
  aria-label="Book interview"
  className="btn-primary"
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Book Now'}
</button>
```

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Deployment

### Build Process

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Configuration

**Production (.env.production)**
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=MockInterviewPrep
```

### Hosting Options

**Recommended platforms:**
- **Vercel** - Automatic deployments from Git
- **Netlify** - Static site hosting with CDN
- **AWS S3 + CloudFront** - Enterprise solution

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
```

## Development Guidelines

### Code Style
- **ESLint** configuration for consistent formatting
- **Prettier** for automatic code formatting
- **Component naming** - PascalCase for components
- **File structure** - Feature-based organization

### Git Workflow
```bash
# Feature development
git checkout -b feature/user-dashboard
git add .
git commit -m "Add user dashboard with interview tracking"
git push origin feature/user-dashboard
```

### Component Development
```jsx
// Component template
import { useState } from 'react'
import { SomeIcon } from 'lucide-react'

function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue)

  return (
    <div className="component-class">
      {/* Component JSX */}
    </div>
  )
}

export default ComponentName
```

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend is running on port 3001
- Check VITE_API_URL in .env file

**Build Failures**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all imports are correct

**Authentication Issues**
- Check JWT token in localStorage
- Verify API endpoints are accessible
- Confirm backend authentication middleware

### Development Tips

1. **Hot Reload** - Changes auto-refresh in development
2. **DevTools** - React DevTools for debugging
3. **Network Tab** - Monitor API requests
4. **Console Logs** - Check for JavaScript errors

## Contributing

### Setup for Contributors

1. Fork the repository
2. Clone your fork locally
3. Create feature branch
4. Make changes with tests
5. Submit pull request

### Pull Request Guidelines

- **Descriptive titles** and descriptions
- **Test coverage** for new features
- **Screenshots** for UI changes
- **Documentation** updates

## Future Enhancements

### Planned Features
- **Real-time notifications** with WebSockets
- **Video calling integration** with WebRTC
- **Mobile app** with React Native
- **Advanced analytics** dashboard
- **Multi-language support** with i18n

### Technical Improvements
- **Performance monitoring** with Web Vitals
- **Error tracking** with Sentry
- **A/B testing** framework
- **Progressive Web App** features

## License

This project is licensed under the MIT License.

---

For backend API documentation, see [Backend README](../backend/README.md)