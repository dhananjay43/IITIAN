# MockInterviewPrep Backend API

RESTful API for the MockInterviewPrep interview booking platform built with Express.js and Node.js.

## Features

- **User Authentication** - JWT-based auth with bcrypt password hashing
- **Profile Management** - User registration, login, and profile updates
- **Interview Booking** - Schedule and manage mock interviews
- **File Uploads** - Resume uploads with validation
- **Interviewer Applications** - Apply to become an interviewer
- **Input Validation** - Joi schema validation for all endpoints
- **Error Handling** - Centralized error handling with custom middleware
- **Security** - Helmet, CORS, and rate limiting
- **Testing** - Jest test suite with supertest integration

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Joi** - Input validation
- **Multer** - File upload handling
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

## Project Structure

```
backend/
├── src/
│   ├── controllers/         # Route handlers and business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── interviewController.js
│   │   └── interviewerController.js
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── interviewRoutes.js
│   │   └── interviewerRoutes.js
│   ├── middleware/         # Custom middleware functions
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── data/              # Mock data storage (JSON-based)
│   │   ├── users.js
│   │   └── interviews.js
│   ├── __tests__/         # Test files
│   │   └── auth.test.js
│   └── server.js          # Application entry point
├── uploads/               # File upload storage
│   ├── resumes/
│   └── interviewer-resumes/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   JWT_EXPIRE=30d
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The API server will start on http://localhost:3001

### Available Scripts

```bash
# Development with auto-reload
npm run dev

# Production start
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/profile` | Get current user profile | Yes |
| POST | `/forgot-password` | Request password reset | No |
| PUT | `/reset-password/:token` | Reset password | No |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/profile` | Update user profile | Yes |
| POST | `/upload-resume` | Upload user resume | Yes |
| DELETE | `/profile` | Delete user account | Yes |

### Interviews (`/api/interviews`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/available` | Get available slots | No |
| GET | `/user/:userId` | Get user interviews | Yes |
| POST | `/book` | Book an interview | Yes |
| PUT | `/:id/cancel` | Cancel interview | Yes |
| GET | `/:id/feedback` | Get interview feedback | Yes |
| POST | `/:id/feedback` | Submit feedback | Yes |

### Interviewers (`/api/interviewers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all interviewers | No |
| POST | `/apply` | Apply to be interviewer | No |
| POST | `/upload-resume` | Upload interviewer resume | No |
| GET | `/profile` | Get interviewer profile | Yes |

## Request/Response Examples

### Register User

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "terms": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "profileCompleted": false,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

### Book Interview

**POST** `/api/interviews/book`

```json
{
  "date": "2024-07-25T14:00:00.000Z",
  "time": "2:00 PM",
  "interviewType": "Technical",
  "domain": "Technical",
  "profile": "Software"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interview booked successfully",
  "data": {
    "id": "uuid-here",
    "userId": "user-uuid",
    "interviewerId": "interviewer-uuid",
    "interviewerName": "Dr. Eleanor Vance",
    "date": "2024-07-25T14:00:00.000Z",
    "time": "2:00 PM",
    "status": "upcoming",
    "meetingLink": "https://meet.google.com/mock-interview-123",
    "price": 50.00
  }
}
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-jwt-token-here
```

## File Uploads

### Resume Upload

- **Endpoint:** `POST /api/users/upload-resume`
- **Accepted formats:** PDF, DOC, DOCX
- **Max file size:** 10MB
- **Field name:** `resume`

```bash
curl -X POST \
  -H "Authorization: Bearer your-token" \
  -F "resume=@/path/to/resume.pdf" \
  http://localhost:3001/api/users/upload-resume
```

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Tests are located in `src/__tests__/` and cover:
- Authentication endpoints
- User management
- Interview booking
- File uploads
- Error handling

## Data Storage

Currently uses in-memory JSON storage for development. Data includes:

- **Users** - User accounts and profiles
- **Interviews** - Booked interviews and slots
- **Interviewers** - Interviewer profiles and applications

### Mock Data

Pre-loaded with sample data for testing:
- 2 sample users (credentials: `sarah@example.com` / `password123`)
- Multiple available interview slots
- Sample interviewer profiles

## Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Input Validation** - Joi schema validation
- **File Upload Security** - Type and size validation
- **CORS Configuration** - Controlled cross-origin access
- **Helmet** - Security headers
- **Rate Limiting** - Request throttling (production)

## Production Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure proper CORS origins
4. Set up database connection
5. Configure file storage (AWS S3)
6. Set up monitoring and logging

### Database Migration

Replace JSON storage with database:

1. **PostgreSQL Setup**
   ```sql
   CREATE DATABASE mockinterviewprep;
   -- Add your schema here
   ```

2. **Update Data Layer**
   - Replace `src/data/` modules with database models
   - Add database connection configuration
   - Implement migrations

### Recommended Production Stack

- **Database:** PostgreSQL or MongoDB
- **File Storage:** AWS S3 or similar
- **Hosting:** Railway, Render, or Heroku
- **Monitoring:** LogRocket, Sentry
- **CI/CD:** GitHub Actions

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## API Documentation

Full API documentation available at: http://localhost:3001/api

Health check endpoint: http://localhost:3001/health

## License

This project is licensed under the MIT License.