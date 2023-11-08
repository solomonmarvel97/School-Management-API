const { Op } = require('sequelize')
const { db } = require('../model/index')

class PromotionService {
    constructor(model) {
        this.model = model
    }

    async promoteStudent(name, currentClass, promotionFromClass, promotionToClass) {
        try {
            const result = await this.model.create({ name: name,  currentClass: currentClass, promotionFromClass : promotionFromClass, promotionToClass : promotionToClass })
            return result
        } catch (err) {
            throw err
        }
    }

   
}

module.exports = { PromotionService: new PromotionService(db.studentPromotionModel.StudentPromotion) }