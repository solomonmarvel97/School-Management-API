const { Op } = require('sequelize')
const { Subject } = require("../model/subject.model")
const { logger } = require('../config/logger')

class SubjectService {
    static async createSubject(subject, teacher, Classes, days) {
        try {
            if (!subject || !teacher || !Classes || !days) {
                throw new Error('All arguments are required')
            }
            const resultSet = await Subject.create({ subject: subject, teacher: teacher, Classes: Classes, days: days })
            return resultSet
        } catch (err) {
            console.error(err)
            logger.error(`Failed to create a new subject ${err}`)
            throw new Error('Failed to create a new subject')
        }
    }

    static async listSubject() {
        try {
            const resultSet = await Subject.findAll({ attributes: ['subject', 'teacher', 'Classes', 'days'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve subjects ${err}`)
            throw new Error('Failed to retrieve subjects')
        }
    }

    static async searchSubject(subject, Classes) {
        try {
            if (!subject || !Classes) {
                throw new Error('All arguments are required')
            }
            const resultSet = await Subject.findAll({
                where: {
                    [Op.and]: [subject ? { subject: { [Op.like]: `%${subject}%` } } : null,
                    Classes ? { Classes: Classes } : null,]
                }, attributes: ['subject', 'teacher', 'Classes', 'days']
            })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve subject ${err}`)
            throw new Error('Failed to retrieve subject')
        }
    }
}

module.exports = { SubjectService }