const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Add teacher', () => {
    it('should create a new teacher', (done) => {
        return request(app)
            .post('/api/teachers')
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .send({ fisrtname : '', lastname : '', gender :'', dateOfBirth : '' , bloodGroup : '', religion : '', email :'' , phone : '' ,Class :'', subject :'', address : '',  startDate : '', imageUrl : ''})
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})



describe('List teachers', () => {
    it('should retrieve all teachers', (done) => {
        return request(app)
            .get('/api/teachers/list-teacher')
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})

describe('Search student', () => {
    it('should retrieve  teacher that matches the search query and filter', (done) => {
        const name = 'Allan'
        const Class = 1
        return request(app)
            .get(`/api/students/search?name${name}&Class${Class}`)
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})


describe('Get a teacher', () => {
    it('should retrieve a teacher', (done) => {
        const teacherId = 1
        return request(app)
            .get(`/api/teachers/${teacherId}`)
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})