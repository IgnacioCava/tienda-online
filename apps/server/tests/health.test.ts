import request from 'supertest'
import app from '../src/server'

describe('Health Route', () => {
  it('should return 200 and status ok', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
