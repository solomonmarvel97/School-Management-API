const { Op } = require('sequelize')
const { db } = require('../model/index')

class ParentService {
    constructor(model) {
        this.model = model
    }

    async createParent(fatherName, motherName, email, phone, fathersOccupation, address, parentReligion) {
        try {
            const result = await this.model.create({ firstName : fatherName, motherName : motherName, email : email, phone : phone, fathersOccupation : fathersOccupation, address : address, parentReligion: parentReligion})
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

    async getParentCount(){
        try{
            const result = await this.model.count()
            return result
        }catch(err){
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