const { StudentPromotion } = require('../model/student.promotion.model')
const { logger } = require('../config/logger')

class PromotionService {
    static async promoteStudent(name, currentClass, promotionFromClass, promotionToClass) {
        try {
            if (!name || !currentClass || !promotionFromClass || !promotionToClass) {
                throw new Error('All Argument are required!')
            }
            const resultSet = await StudentPromotion.create({ name: name, currentClass: currentClass, promotionFromClass: promotionFromClass, promotionToClass: promotionToClass })
            return resultSet
        } catch (err) {
            logger.error(`Failed to promote student ${err}`)
            throw new Error('Failed to promote student')
        }
    }
}

module.exports = { PromotionService }