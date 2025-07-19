# MockInterviewPrep - Interview Booking Platform

A comprehensive interview booking web application that connects students with industry professionals for mock interviews.

## Features

- **User Authentication** - Login/Register with email or Google OAuth
- **Profile Management** - Complete user profiles with resume upload
- **Interview Booking** - Interactive calendar for scheduling interviews
- **Dashboard** - Track upcoming interviews and feedback
- **Payment Integration** - Secure payment processing
- **Interviewer Portal** - Application system for professionals

## Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Context API** for state management
- **Tailwind CSS** for styling
- **React Hook Form** for form validation
- **Axios** for API calls
- **React Testing Library** for testing

### Backend
- **Express.js** with Node.js
- **CORS** for cross-origin requests
- **Joi** for input validation
- **Multer** for file uploads
- **JSON file storage** (easily replaceable with database)

## Project Structure

```
mockinterviewprep/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── context/        # Global state management
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── README.md
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── data/          # JSON data storage
│   │   └── server.js      # Server entry point
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mockinterviewprep
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install:all
   ```

3. **Start both servers in development mode**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend dev server on http://localhost:5173
   - Backend API server on http://localhost:3001

### Individual Commands

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Interviews
- `GET /api/interviews` - Get available interview slots
- `POST /api/interviews/book` - Book an interview
- `GET /api/interviews/user/:userId` - Get user's interviews

### Users
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-resume` - Upload resume

### Interviewers
- `POST /api/interviewers/apply` - Apply to become interviewer
- `GET /api/interviewers` - Get available interviewers

## Development Guidelines

### State Management Choice: Context API
We chose Context API over Redux because:
- Simpler setup for medium-sized applications
- Built into React (no additional dependencies)
- Sufficient for our authentication and user state needs
- Easier to understand and maintain

### Code Organization
- **Components**: Atomic design principles (atoms, molecules, organisms)
- **Pages**: Full page components with routing
- **Services**: API calls abstracted into service layer
- **Hooks**: Custom hooks for business logic reuse

## Testing

Run tests:
```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test
```

## Deployment Considerations

### Environment Variables
Create `.env` files:

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001/api
```

**Backend (.env):**
```
PORT=3001
NODE_ENV=development
```

### Production Build
```bash
cd frontend && npm run build
```

## Next Steps for Production

1. **Database Integration**: Replace JSON storage with PostgreSQL/MongoDB
2. **Authentication**: Implement JWT tokens and refresh mechanisms
3. **File Storage**: Use AWS S3 for resume uploads
4. **Email Service**: Add email notifications (SendGrid/Nodemailer)
5. **Payment Gateway**: Integrate Stripe/PayPal for real payments
6. **Real-time**: Add WebSocket for live interview status updates

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
