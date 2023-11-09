const { db } = require("../model")
const { Op } = require('sequelize')

class FeeService {
    constructor(model){
        this.model = model
    }

    async listStudentFee(){
        try{
            const result = await this.model.findAll({ attributes : ['name','gender','Class','amount','status','email', 'phone']})
            return result
        }catch(err){
            throw err
        }
    }

    async searchFee(name, Class, status){
     try{
        const result = await this.model.findAll({
            where: {
                [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                Class ? { Class : Class } : null,
                status ? { status: status } : null]
            }, attributes: ['name','gender','Class','amount','status','email','phone']
        })
        return result
     }catch(err){
        throw err

     }
    }
}

module.exports = { FeeService : new FeeService(db.studentFeesModel.StudentFees)}