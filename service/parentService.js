const { Op } = require('sequelize')
const { db } = require('../model/index')

class ParentService {
    constructor(model) {
        this.model = model
    }

    async createParent(name, gender, phone, religion, fathersOccupation, email, address) {
        try {
            const result = await this.model.create({ name : name, gender : gender, phone : phone, religion : religion, fathersOccupation : fathersOccupation, email : email, address : address})
            return result
        } catch (err) {
            throw err
        }

    }

    async listParent() {
        try {
            const result = await this.model.findAll()
            return result
        } catch (err) {
            throw err
        }
    }

    // async getStudent(userId) {
    //     try {
    //         const result = await this.model.findOne({ where: { id: userId } })
    //         return result
    //     } catch (err) {
    //         throw err
    //     }
    // }

    async searchParent(name, gender){
        try{
            const result = await this.model.findAll({ where : { name : {[Op.like] : `%${name}%`}, gender : gender }})
            return result
        }catch(err){
            throw err

        }
    }
}

module.exports = { ParentService: new ParentService(db.parentModel.Parent) }