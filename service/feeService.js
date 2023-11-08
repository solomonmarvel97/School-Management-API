const { db } = require("../model")

class FeeService {
    constructor(model){
        this.model = model
    }

    async listStudentFees(){
        try{
            const result = await this.model.findAll({ attributes : ['name','gender','Class','amount','status','phone','email']})
            return result
        }catch(err){
            throw err
        }
    }

    async searchFees(name, Class, status){
     try{
        const result = await this.model.findAll({
            where: {
                [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                Class ? { Class : Class } : null,
                status ? { status: status } : null]
            }, attributes: ['name','expenseType','amount','status','email','phone','dueDate']
        })
        return result
     }catch(err){
        throw err

     }
    }
}

module.exports = { FeeService : new FeeService(db.feesGroupModel.FeesGroup)}