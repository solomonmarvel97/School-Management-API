const { Op } = require('sequelize')
const { db } = require('../model/index')

class ParentService {
    constructor(model) {
        this.model = model
    }

    async createParent(fatherName, motherName, email, phone, fathersOccupation, address, parentReligion) {
        try {
            const result = await this.model.create({ fatherName : fatherName, motherName : motherName, email : email, phone : phone, fathersOccupation : fathersOccupation, address : address,  religion  : parentReligion })
            return result
        } catch (err) {
            throw err
        }

    }

    async listParent() {
        try {
            const result = await this.model.findAll({ attributes : ['id', 'fatherName', 'motherName','fathersOccupation','address','email','phone']})
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

    async getParent(parentId) {
        try {
            const result = await this.model.findOne({ where: { id: parentId } })
            return result
        } catch (err) {
            throw err
        }
    }

    async searchParent(name, religion){
        try{
            const result = await this.model.findAll({ where : {[Op.and] : [ name ? { fatherName : {[Op.like]: `%${ name }%`}} : null,
            religion ? { religion : religion } : null ]},  attributes : ['id','fatherName','motherName', 'fathersOccupation', 'address', 'email', 'phone']})
            return result
        }catch(err){
            throw err

        }
    }
}

module.exports = { ParentService: new ParentService(db.parentModel.Parent) }