const app = require('../app')
const request = require('supertest')

describe('Base route ', () => {
    it('this route is the base route of the application and aslo the healthcheck route', (done) => {
        return request(app)
            .get('/')
            .expect(200, done())
    })
})

describe('Admin login', () => {
    it('should login an admin', (done) => {
        request(app)
            .post('/api/login')
            .send({ username: 'prince', password: 'snr man' })
            .auth('username', 'password')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) 
                    return done(err)
                console.log(res.body)
                done()
            })
    })
})

describe('Refresh access token', ()=>{
    it('should generate a new access token', (done)=>{
        return request(app)
        .post('/api/refreshtoken')
        .send({ refreshtoken : ''})
        .expect(200)
        .end((err, res)=>{
            if(err){
                return done(err)
            }
            console.log(res.body)
            done()
        })
    })
})