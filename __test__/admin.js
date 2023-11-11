const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Admin dashboard', () => {
    it('should respond with student  teacher and parent count', (done) => {
        request(app)
            .get('/api/dashboard')
            .set('Authorization', '')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})