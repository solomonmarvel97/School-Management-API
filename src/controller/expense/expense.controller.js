const { logger } = require("../../config/logger")
const { ExpenseService } = require("../../service/expense.service")
const { respond } = require("../../utils/respond")


class ExpenseController {

    // Create a new Expense
    static async addExpense(req, res) {
        try {
            const { name, expenseType, status, amount, phone, email, dueDate } = req.body
            const newExpense = await ExpenseService.createExpense(name, expenseType, status, amount, phone, email, dueDate)
            if (!newExpense) {
                return respond(res, 409, "Expense not added")
            }
            return respond(res, 201, 'Expense added successfully', { expense: newExpense })
        } catch (err) {
            logger.error(`Failed to add expense ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve all Expenses
    static async listExpense(req, res) {
        try {
            const expenses = await ExpenseService.listExpense()
            if (!expenses) {
                return respond(res, 409, 'Expenses not retrieved')
            }
            return respond(res, 200, 'Expenses retriebed successfully', { expenses })
        } catch (err) {
            logger.error(`Failed to retrieve expenses ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by name and filter by expenseType and status
    static async searchExpense(req, res) {
        try {
            const { name, expenseType, status } = req.query
            const expense = await ExpenseService.searchExpense(name, expenseType, status)
            if (!expense) {
                return respond(res, 404, 'Expense not found')
            }
            return respond(res, 200, 'Expense successfully retrieved', { expense })
        } catch (err) {
            logger.error(`Failed to retrieve expense ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }
}

module.exports = { ExpenseController }