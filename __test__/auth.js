const app = require('../app')
const request = require('supertest')

describe('Base route ', ()=>{
    it('this route is the base route of the application and aslo the healthcheck route', (done)=>{
       return  request(app)
       .get('/')
       .expect(200)
       .end((err, res)=>{
        if(err){
            return done(err)
        }
        done()
       })
    })
})

describe('Admin login', ()=>{
    it('should login an admin', (done)=>{
        return request(app)
        .post('/api/login')
        .send({ username : 'prince Afful Quansah', password : ''})
        .auth('username','password')
        .set('Accept', 'Application/json')
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

describe('Refresh access token', ()=>{
    it('should generate a new access token', (done)=>{
        return request(app)
        .post('/api/refreshtoken')
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