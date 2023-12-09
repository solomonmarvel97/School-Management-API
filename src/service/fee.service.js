const { Op } = require('sequelize')
const { StudentFees } = require('../model/student.fees.model')
const { logger } = require('../config/logger')

class FeeService {
    static async listStudentFee() {
        try {
            const resultSet = await StudentFees.findAll({ attributes: ['name', 'gender', 'Class', 'amount', 'status', 'email', 'phone'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve studentFee ${err}`)
            throw new Error('Failed to retrieve studentFee')
        }
    }

    static async searchFee(name, Class, status) {
        try {
            if(!name || !Class || !status){
                throw new Error('All argument are required!')
            }
            const resultSet = await StudentFees.findAll({
                where: {
                    [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                    Class ? { Class: Class } : null,
                    status ? { status: status } : null]
                }, attributes: ['name', 'gender', 'Class', 'amount', 'status', 'email', 'phone']
            })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve fee ${err}`)
            throw new Error('Failed to retrieve fee')

        }
    }
}

module.exports = { FeeService }