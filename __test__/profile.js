const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Add profile', () => {
    it('should add or create a profile', (done) => {
        return request(app)
            .get('/api/profiles')
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .send({ profileImage: profileImage, coverImage: coverImage, schoolName: 'Firm Foundation', email: 'quansah10@gmail.com', phone: 9087654321, city: 'Accra', address: '24 Avla Accra ', languages: 'English', adminId : 2 })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})

describe('View profile', () => {
    it('should retrieve profile', (done) => {
        return request(app)
            .get('/api/profiles/view-profile')
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


describe('Update profile', () => {
    it('should update a profile', (done) => {
        return request(app)
            .patch('/api/profiles/update-profile')
            .set('Authorization', `${process.env.ACCESS_TOKEN}`)
            .send({username : '', password : '', id : 1})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})