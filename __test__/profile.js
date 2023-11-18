const app = require('../app')
const request = require('supertest')

describe('Add profile', () => {
    it('should add or create a profile', (done) => {
        return request(app)
            .post('/api/profiles')
            .set('Authorization', '')
            .send({schoolName: 'Firm Foundation', email: 'quansah10@gmail.com', phone: 9087654321, city: 'Accra', address: '24 Avla Accra ', languages: 'English', adminId: 2 })
            .attach(' profileImage', '__test__\images\code.png', ' coverImage: ', '__test__\images\code.png')
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
        request(app)
            .get('/api/profiles/view-profile')
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


describe('Update profile', () => {
    it('should update a profile', (done) => {
        request(app)
            .patch('/api/profiles/update-profile')
            .set('Authorization', '')
            .send({ username: 'jerome', id: 2 })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})