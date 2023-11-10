const app = require('../app')
const request = require('supertest')
require('dotenv').config()

describe('Add or create an expense', ()=>{
    it('should create an expense', (done)=>{
       return  request(app)
       .post('/api/expenses')
       .set('Authorization', `${process.env.ACCESS_TOKEN}`)
       .expect(201)
       .end((err, res)=>{
        if(err){
            return done(err)
        }
        done()
       })
    })
})

describe('List expense', ()=>{
    it('should retrieve all expenses', (done)=>{
       return  request(app)
       .post('/api/expenses/list-expense')
       .set('Authorization', `${process.env.ACCESS_TOKEN}`)
       .expect(200)
       .end((err, res)=>{
        if(err){
            return done(err)
        }
        done()
       })
    })
})

describe('Search and filter expense', ()=>{
    it('should retrieve expense that matches the search query and filter', (done)=>{
      const nameValue = 'Allan'
      const expenseTypeValue = 'Salary'
      const statuValue = 'Unpaid'
       return  request(app)
       .post(`/api/expenses/search?name${nameValue}&expenseType${expenseTypeValue}&status${statuValue}`)
       .set('Authorization', `${process.env.ACCESS_TOKEN}`)
       .expect(200)
       .end((err, res)=>{
        if(err){
            return done(err)
        }
        done()
       })
    })
})