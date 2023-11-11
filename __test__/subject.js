const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Add subject', () => {
    it('should create a new subject', (done) => {
        return request(app)
            .post('/api/subjects')
            .set('Authorization', '')
            .send({ name :'English', teacher :'Jude', Classes : '1', days : 124 })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})


describe('List subjects', () => {
    it('should retrieve all subjects', (done) => {
        return request(app)
            .get('/api/subjects/list-subject')
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

describe('Search subject', () => {
    it('should retrieve subject that matches the search query', (done) => {
        const name = 'English'
        return request(app)
            .get(`/api/subjects/search?name=${name}`)
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


