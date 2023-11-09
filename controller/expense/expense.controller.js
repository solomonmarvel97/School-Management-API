const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Expense {

    // Add a new Expense
    static async addExpense(req, res) {
        try {
            const { name, expenseType, status, amount, phone, email, dueDate } = req.body
            const newExpense = await service.expenseService.createExpense( name, expenseType, status, amount, phone, email, dueDate )
            if (!newExpense) {
                return res.status(400).json(new ErrorResponse('expense not added'))
            }
            return res.status(201).json(new SuccessResponse('expense successfully added', newExpense))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error adding expense'))
        }
    }

    //Return a List of Expenses
    static async listExpense(req, res) {
        try {
            const expenses = await service.expenseService.listExpense()
            if (!expenses) {
                return res.status(400).json(new ErrorResponse('expenses not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('expenses successfully retrieved', expenses))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving expenses'))

        }

    }


    //Search by name and filter by expenseType, status
    static async searchExpense(req, res) {
        try {
            const { name, expenseType, status } = req.query
            const expense = await service.expenseService.searchExpense(name, expenseType, status)
            if (!expense) {
                return res.status(404).json(new ErrorResponse('expense not found'))
            }
            return res.status(200).json(new SuccessResponse('expense successfully retrieved', expense ))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }
}

module.exports = { Expense }