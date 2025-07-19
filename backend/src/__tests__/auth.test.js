const request = require('supertest')
const app = require('../server')

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        terms: true
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe(userData.email)
      expect(response.body.data.token).toBeDefined()
      expect(response.body.data.user.password).toBeUndefined()
    })

    it('should return error for existing email', async () => {
      const userData = {
        name: 'Test User',
        email: 'sarah@example.com', // This email already exists in mock data
        password: 'password123',
        confirmPassword: 'password123',
        terms: true
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('already exists')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login existing user successfully', async () => {
      const loginData = {
        email: 'sarah@example.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe(loginData.email)
      expect(response.body.data.token).toBeDefined()
    })

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'sarah@example.com',
        password: 'wrongpassword'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Invalid credentials')
    })
  })

  describe('GET /api/auth/profile', () => {
    it('should return user profile with valid token', async () => {
      // First login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'sarah@example.com',
          password: 'password123'
        })

      const token = loginResponse.body.data.token

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.email).toBe('sarah@example.com')
    })

    it('should return error without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })
})

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)

    expect(response.body.status).toBe('success')
    expect(response.body.message).toContain('running')
  })
})