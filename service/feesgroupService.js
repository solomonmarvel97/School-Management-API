const { Op } = require('sequelize')
const { db } = require('../model/index')

class feesGropuService {
    constructor(model) {
        this.model = model
    }

    async listFeesGroup() {
        try {
            const result = await this.model.findAll({ attributes : ['id','name','feesType', 'description']})
            return result
        } catch (err) {
            throw err
        }
    }

    async searchFeeGroup(feeGroup){
        try{
            const result = await this.model.findAll({ where: { name: {[Op.like]: `%${feeGroup}%`}}})
            return result
        }catch(err){
            throw err
        }
    }

}

module.exports = { feesGropuService: new feesGropuService(db.feesGroupModel.FeesGroup) }