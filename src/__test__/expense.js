const app = require('../app')
const request = require('supertest')


describe('Add or create an expense', () => {
    it('should create an expense', (done) => {
        request(app)
            .post('/api/expenses')
            .set('Authorization', '')
            .send({ name: 'john', expenseType: 'Salary', status: 'Paid', amount: '5000.00', phone: 832592260, email: 'allan10@gmail.com', dueDate: "2019-02-02" })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})

describe('List expense', () => {
    it('should retrieve all expenses', (done) => {
        request(app)
            .get('/api/expenses/list-expense')
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

describe('Search and filter expense', () => {
    it('should retrieve expense that matches the search query and filter', (done) => {
        const name = 'Allan'
        const expenseType = 'Salary'
        const status = 'Unpaid'
        request(app)
            .get(`/api/expenses/search?name=${name}&expenseType=${expenseType}&status=${status}`)
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