const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('List fees', () => {
    it('should retrieve all fees', (done) => {
        request(app)
            .get('/api/fees/list-fee')
            .set('Authorization', '')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                console.log(res.body)
                done()
            })
    })
})

describe('Search fees', () => {
    it('should retrieve expense that matches the search query and filter', (done) => {
        const name = 'Allan'
        const Class = 1
        const status = 'Unpaid'
        request(app)
            .get(`/api/fees/search?name=${name}&expenseType&=${Class}&status=${status}`)
            .set('Authorization', '')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                console.log(res.body)
                done()
            })
    })
})


describe('List fee group', () => {
    it('should retrieve all fee group', (done) => {
        request(app)
            .get('/api/fees/list-group')
            .set('Authorization', '')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                console.log(res.body)
                done()
            })
    })
})

describe('Search fees group', () => {
    it('should retrieve fee group that matches the search query', (done) => {
        const name = 'Creche Fees'
        request(app)
            .get(`/api/fees/group-search?name=${name}`)
            .set('Authorization', '')
            .expect(200)
            .end((err, res) => {
                if (err) 
                    return done(err)
                console.log(res.body)
                done()
            })
    })
})