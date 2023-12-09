const express = require('express')
const router = express.Router()
const { Authorize } = require('../utils/authJwt')
const { ExpenseController } = require('../controller/expense/expense.controller')
const { Validation } = require('../utils/validation')

router.post('/expenses', Validation.expenseValidation, Validation.check, Authorize.verifyAccessToken, ExpenseController.addExpense)

router.get('/expenses/list-expense', Authorize.verifyAccessToken, ExpenseController.listExpense)

router.get('/expenses/search', Authorize.verifyAccessToken, ExpenseController.searchExpense)


module.exports = router