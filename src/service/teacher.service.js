const { Op } = require('sequelize')
const { Teacher } = require('../model/teacher.model')
const { logger } = require('../config/logger')

class TeacherService {
    static async createTeacher(firstname, lastname, gender, dateOfBirth, bloodGroup, religion, email, phone, Class, subject, address, startDate, imageUrl) {
        try {
            if(!firstname ||  !lastname || !gender || !dateOfBirth || !bloodGroup || !religion || !email || !phone || !Class || !subject || !address || !startDate || !imageUrl){
                throw new Error('All arguments are required')
            }
            const resultSet = await Teacher.create({ firstName: firstname, lastName: lastname, gender: gender, dateOfBirth: dateOfBirth, bloodGroup: bloodGroup, religion: religion, email: email, phone: phone, Class: Class, subject: subject, address: address, startDate: startDate, imageUrl: imageUrl })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create teacher ${err}`)
            throw new Error('Failed to a new create teacher')
        }
    }

    static async listTeacher() {
        try {
            const resultSet = await Teacher.findAll({ attributes: ['id', 'firstName', 'lastName', 'gender', 'Class', 'subject', 'address', 'dateOfBirth', 'phone'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve all teachers ${err}`)
            throw new Error('Failed to retrieve teachers')
        }
    }

    static async getTeacherCount() {
        try {
            const resultSet = await Teacher.count()
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve teacher ${err}`)
            throw new Error('Failed to retrieve teacher')
        }
    }

    static async getTeacher(studentId) {
        try {
            if(!studentId){
                throw new Error('All arguments are required')
            }
            const resultSet = await Teacher.findOne({ where: { id: studentId }, attributes: ['imageUrl', 'id', 'firstName', 'lastName', 'gender', 'Class', 'subject', 'address', 'dateOfBirth', 'email', 'phone'] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve teacher ${err}`)
            throw new Error('Failed to retrieve teacher')
        }
    }

    static async searchTeacher(firstName, Class) {
        try {
            if(!firstName || !Class){
                throw new Error('All arguments are required')
            }
            const resultSet = await Teacher.findAll({
                where: {
                    [Op.and]: [firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null,
                    Class ? { Class: Class } : null]
                }, attributes: ['id', 'firstName', 'lastName', 'gender', 'Class', 'subject', 'address', 'dateOfBirth', 'phone']
            })
            return resultSet
        } catch (err) {
            console.error(err)
            logger.error(`Failed to retrieve teacher ${err}`)
            throw new Error('Failed to retrieve teacher')

        }
    }
}

module.exports = { TeacherService }