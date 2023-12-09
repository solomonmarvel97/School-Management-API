const { Op } = require('sequelize')
const { Expense } = require('../model/expense.model')
const { logger } = require('../config/logger')

class ExpenseService {
    static async createExpense(name, expenseType, status, amount, phone, email, dueDate) {
        try {
            if(!name || !expenseType || !status || !amount || !phone || !email || !dueDate){
                throw new Error('All argument are required!')
            }
            const resultSet = await Expense.create({ name: name, expenseType: expenseType, status: status, amount: amount, phone: phone, email: email, dueDate: dueDate })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create a new expense ${err}`)
            throw new Error('Failed to create a new expense')
        }
    }

    static async listExpense() {
        try {
            const resultSet = await Expense.findAll({ attributes: ['id', 'name', 'expenseType', 'amount', 'status', 'email', 'phone', 'dueDate'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve expense ${err}`)
            throw new Error('Failed to retrieve expense')
        }
    }

    static async searchExpense(name, expenseType, status) {
        try {
            if(!name || !expenseType || !status){
                throw new Error('All argument are required!')
            }
            const resultSet = await Expense.findAll({
                where: {
                    [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                    expenseType ? { expenseType: expenseType } : null,
                    status ? { status: status } : null]
                }, attributes: ['name', 'expenseType', 'amount', 'status', 'email', 'phone', 'dueDate']
            })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve expense ${err}`)
            throw new Error('Failed to retrieve expense')
        }
    }
}

module.exports = { ExpenseService }