const { Op, Sequelize } = require('sequelize')
const { db } = require('../model/index')

class StudentService {
    constructor(model) {
        this.model = model
    }

    async createStudent(name, gender, studentClass, dateOfBirth, bloodGroup, religion, admissionDate, imageUrl) {
        try {
            const result = await this.model.create({ name: name, gender: gender, religion : religion, studentClass: studentClass, dateOfBirth: dateOfBirth, bloodGroup: bloodGroup, religion: religion, admissionDate: admissionDate, imageUrl: imageUrl })
            return result
        } catch (err) {
            throw err
        }

    }

    async listStudent() {
        try {
            const result = await this.model.findAll()
            return result
        } catch (err) {
            throw err
        }
    }

    async getStudentCount(){
        try{
            const result = await this.model.count()
            return result
        }catch(err){
            throw err
        }
    }

    // async getStudent(userId) {
    //     try {
    //         const result = await this.model.findOne({ where: { id: userId } })
    //         return result
    //     } catch (err) {
    //         throw err
    //     }
    // }

    async searchStudent(name, student_class){
        try{
            const result = await this.model.findAll({ where : { name : {[Op.like] : `%${name}%`}, class : student_class }})
            return result
        }catch(err){
            throw err

        }
    }
}

module.exports = { StudentService: new StudentService(db.studentModel.Student) }