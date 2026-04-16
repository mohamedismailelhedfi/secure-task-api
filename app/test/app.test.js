const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {

  it('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('POST /tasks should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });

});