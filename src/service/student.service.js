const { Op } = require('sequelize')
const { Student } = require('../model/student.model')
const { StudentPromotion } = require('../model/student.promotion.model')
const { logger } = require('../config/logger')
const { Parent } = require('../model/parent.model')

class StudentService {
    static async createStudent(name, gender, Class, dateOfBirth, bloodGroup, studentReligion, admissionDate, imageUrl) {
        try {
            if (!name || !gender || !Class, !dateOfBirth || !bloodGroup || !studentReligion || !admissionDate || !imageUrl) {
                throw new Error('All arguments are required!')
            }
            const resultSet = await Student.create({ name: name, gender: gender, Class: Class, dateOfBirth: dateOfBirth, bloodGroup: bloodGroup, religion: studentReligion, admissionDate: admissionDate, imageUrl: imageUrl })
            return resultSet
        } catch (err) {
            logger.error(`Failed to create a new student ${err}`)
            throw new Error('Failed to create a new student')
        }
    }

    static async listStudent() {
        try {
            const resultSet = await Student.findAll({ attributes: ['id', 'name', 'gender', 'Class', 'dateOfBirth'], include: [{ model: Parent, attributes: ['address', 'phone'] }] })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve students ${err}`)
            throw new Error('Failed to retrieve students')
        }
    }

    static async getStudentCount() {
        try {
            const resultSet = await Student.count()
            return resultSet
        } catch (err) {
            logger.error(`Failed to get student count ${err}`)
            throw new Error('Failed to get student count')
        }
    }

    static async getStudent(studentId) {
        try {
            if (!studentId) {
                throw new Error('All argument are required')
            }
            const resultSet = await Student.findOne({ where: { id: studentId } })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve student ${err}`)
            throw new Error('Failed to retrieve student')
        }
    }

    static async searchStudent(name, studentClass) {
        try {
            if (!name || !studentClass) {
                throw new Error('All argument are required!')
            }
            const resultSet = await Student.findAll({
                where: {
                    [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                    studentClass ? { Class: studentClass } : null]
                }, attributes: ['id', 'name', 'gender', 'Class', 'dateOfBirth'], include: [{ model: Parent, attributes: ['address', 'phone'] }]
            })
            return resultSet
        } catch (err) {
            logger.error(`Failed to retrieve students ${err}`)
            throw new Error('Failed to retrieve students')
        }
    }


    static async updateStudent(name) {
        try {
            if (!name) {
                throw new Error('All argument are required!')
            }
            const resultSet1 = await Student.findOne({ where: { name: name } })
            await Student.update({ Class: resultSet1.promotionToClass }, { where: { Class: resultSet1.Class } })
            const resultSet2 = await Student.findOne({ where: { name: name } })
            return resultSet2
        } catch (err) {
            console.error(err)
            logger.error(`Failed to update student ${err}`)
            throw new Error('Failed to update student')
        }
    }
}

module.exports = { StudentService }