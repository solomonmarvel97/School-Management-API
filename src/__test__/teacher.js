const app = require('../app')
const request = require('supertest')

describe('Add teacher', () => {
    it('should create a new teacher', (done) => {
        return request(app)
            .post('/api/teachers')
            .set('Authorization', '')
            .send({ fisrtname : 'John', lastname : 'Timothy', gender :'Male', dateOfBirth : '200-05-04' , bloodGroup : 'o+', religion : 'Islam', email :'tm10@gmail.com' , phone : '9078654431' , Class :'1', subject :'Maths', address : '10 Onokoyo street Accra',  startDate : '2020-11-05'})
            .attach('imageUrl', '__test__\images\code.png')
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

describe('Search teacher', () => {
    it('should retrieve  teacher that matches the search query and filter', (done) => {
        const name = 'Allan'
        const Class = 1
        return request(app)
            .get(`/api/teachers/search?name=${name}&Class=${Class}`)
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


describe('Get a teacher', () => {
    it('should retrieve a teacher', (done) => {
        const teacherId = 1
        return request(app)
            .get(`/api/teachers/${teacherId}`)
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