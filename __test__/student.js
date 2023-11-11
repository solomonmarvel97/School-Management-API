const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Add Student and parent', () => {
    it('should create new  student and parent', (done) => {
        return request(app)
            .post('/api/parents/list-parent')
            .set('Authorization', '')
            .send({ name : '', gender :'', Class : '', dateOfBirth : '', bloodGroup : '', studentReligion : '', addmissionDate : '',
                fatherName : '', motherName : '', email : '', phone : '', fathersOccupation:'', address : '', parentReligion : ''})
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})

describe('Promote Student', () => {
    it('should promote a student to another class', (done) => {
        return request(app)
            .get('/api/students/promote')
            .set('Authorization', '')
            .send({name:'Allan', currentClass : 1, promotionFromClass : 1, promotionToClass : 2})
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})

describe('List students', () => {
    it('should retrieve all student', (done) => {
        return request(app)
            .get('/api/students/list-student')
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

describe('Search student', () => {
    it('should retrieve student that matches the search query and filter', (done) => {
        const name = 'Allan'
        const Class = 1
        return request(app)
            .get(`/api/students/search?name=${name}&Class=${Class}`)
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


describe('Get a student', () => {
    it('should retrieve a student', (done) => {
        const studentId = 1
        return request(app)
            .get(`/api/students/${studentId}`)
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