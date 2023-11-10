const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.post('/api/expenses', utils.validation.expenseValidation, utils.validation.check, middleware.Authorize.verifyToken, controller.expenseController.Expense.addExpense)

router.get('/api/expenses/list-expense', middleware.Authorize.verifyToken, controller.expenseController.Expense.listExpense)

router.get('/api/expenses/search', middleware.Authorize.verifyToken, controller.expenseController.Expense.searchExpense)


module.exports = router