const { Op } = require('sequelize')
const { Parent } = require('../model/parent.model')
const { logger } = require('../config/logger')

class ParentService {
    static async createParent(fatherName, motherName, email, phone, fathersOccupation, address, parentReligion) {
        try {
            if(!fatherName || !motherName || !email || !phone || !fathersOccupation || !address || !parentReligion){
                throw new Error('All argument are required!')
            }
            const resultSet = await Parent.create({ fatherName: fatherName, motherName: motherName, email: email, phone: phone, fathersOccupation: fathersOccupation, address: address, religion: parentReligion })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create a new parent ${err}`)
            throw new Error('Failed to create a new parent')
        }
    }

    static async listParent() {
        try {
            const resultSet = await Parent.findAll({ attributes: ['id', 'fatherName', 'motherName', 'fathersOccupation', 'address', 'email', 'phone'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve parent ${err}`)
            throw new Error('Failed to retrieve parent')
        }
    }

    static async getParentCount() {
        try {
            const resultSet = await Parent.count()
            return resultSet
        } catch (err) {
            logger.error(`Failed to get parent count ${err}`)
            throw new Error('Failed to get parent count')
        }
    }

    static async getParent(parentId) {
        try {
            if(!parentId){
                throw new Error('All argument are required')
            }
            const resultSet = await Parent.findOne({ where: { id: parentId } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve parents ${err}`)
            throw new Error('Failed to retrieve parents')
        }
    }

    static async searchParent(name, religion) {
        try {
            if(!name || !religion){
                throw new Error('All argument required!')
            }
            const resultSet = await Parent.findAll({
                where: {
                    [Op.and]: [name ? { fatherName: { [Op.like]: `%${name}%` } } : null,
                    religion ? { religion: religion } : null]
                }, attributes: ['id', 'fatherName', 'motherName', 'fathersOccupation', 'address', 'email', 'phone']
            })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve parent ${err}`)
            throw new Error('Failed to retrieve parent')
        }
    }
}

module.exports = { ParentService }