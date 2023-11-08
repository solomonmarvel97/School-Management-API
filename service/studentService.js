const { Op } = require('sequelize')
const { db } = require('../model/index')

class StudentService {
    constructor(model) {
        this.model = model
    }

    async createStudent(name, gender, Class, dateOfBirth, bloodGroup, studentReligion, admissionDate, imageUrl) {
        try {
            const result = await this.model.create({ name: name, gender: gender, Class: Class, dateOfBirth: dateOfBirth, bloodGroup: bloodGroup, religion: studentReligion, admissionDate: admissionDate, imageUrl: imageUrl })
            return result
        } catch (err) {
            throw err
        }

    }

    async listStudent() {
        try {
            const result = await this.model.findAll({ attributes: ['id', 'name', 'gender', 'Class', 'dateOfBirth'], include: [{ model: db.parentModel.Parent, attributes: ['address', 'phone'] }] })
            return result
        } catch (err) {
            throw err
        }
    }

    async getStudentCount() {
        try {
            const result = await this.model.count()
            return result
        } catch (err) {
            throw err
        }
    }

    async getStudent(studentId) {
        try {
            const result = await this.model.findOne({ where: { id: studentId } })
            return result
        } catch (err) {
            throw err
        }
    }

    async searchStudent(name, studentClass) {
        try {
            const result = await this.model.findAll({
                where: {
                    [Op.and]: [name ? { name: { [Op.like]: `%${name}%` } } : null,
                    studentClass ? { Class: studentClass } : null]
                }, attributes: ['id', 'name', 'gender', 'Class', 'dateOfBirth'], include: [{ model: db.parentModel.Parent, attributes: ['address', 'phone'] }]
            })
            return result
        } catch (err) {
            throw err

        }
    }


    async updateStudent(name){
        try{
            const result1 = await db.studentPromotionModel.StudentPromotion.findOne({ where : { name : name}})
            const result2 = await this.model.findOne({ where : { name : name}})
            const result3 = await this.model.update({ Class : result1.promotionToClass }, { where : { Class : result2.Class}})
            return result3
        }catch(err){
            throw err
        }
    }
}

module.exports = { StudentService: new StudentService(db.studentModel.Student) }