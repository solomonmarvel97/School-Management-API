const { Op } = require('sequelize')
const { FeesGroup } = require('../model/fees.group.model')
const { logger } = require('../config/logger')

class FeesGroupService {
    static async listFeesGroup() {
        try {
            const resultSet = await FeesGroup.findAll({ attributes: ['id', 'name', 'feesType', 'description'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve feeGroup ${err}`)
            throw new Error('Failed to retrieve feeGroup')
        }
    }

    static async searchFeeGroup(feeGroup) {
        try {
            if(!feeGroup){
                throw new Error('All argument are required!')
            }
            const resultSet = await FeesGroup.findAll({ where: { name: { [Op.like]: `%${feeGroup}%` } } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve feeGroup ${err}`)
            throw new Error('Failed to retrieve feeGroup')
        }
    }
}

module.exports = { FeesGroupService }