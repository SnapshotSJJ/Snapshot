const request = require('supertest');
const app = require('../app.js');

describe('Test the root path', () => {
  test('It should respond to GET method', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  })

  test('It should grab feed on get request', (done) => {
    request(app)
      .get('/posts/all').then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1);
        expect(res.body[0].img_src).toBeTruthy();
        expect(res.body[0].name).toBeTruthy();
        done()
      })
  })
});