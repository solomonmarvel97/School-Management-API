const { db } = require("../model")

class ExpenseService {
    constructor(model){
        this.model = model
    }

    async createExpense(name,  expenseType, status, amount, phone, email, dueDate){
        try{
            const result = await this.model.create({ name : name, expenseType : expenseType, status : status, amount : amount, phone : phone, email : email, dueDate : dueDate})
            return result
        }catch(err){
            throw err
        }
    }

    async listExpense(){
        try{
            const result = await this.model.findAll({ attributes : ['name','expenseType','amount','status','email','phone','dueDate']})
            return result
        }catch(err){
            throw err
        }
    }

    async searchExpense(name, expenseType, status){
     try{
        const result = await this.model.findAll({
            where: {
                [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                expenseType ? { expenseType : expenseType } : null,
                status ? { status: status } : null]
            }, attributes: ['name','expenseType','amount','status','email','phone','dueDate']
        })
        return result
     }catch(err){
        throw err

     }
    }
}

module.exports = { ExpenseService : new ExpenseService(db.expenseModel.Expense)}