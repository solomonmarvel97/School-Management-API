const { Op } = require('sequelize')
const { db } = require('../model/index')

class TeacherService {
    constructor(model) {
        this.model = model
    }

    async createTeacher(name, gender, class_, subject, address, date_of_birth, phone, image_url) {
        try {
            const result = await this.model.create({ name : name, gender : gender, class :class_, subject : subject, address : address, date_of_birth : date_of_birth ,address : address, phone : phone, image_url : image_url})
            return result
        } catch (err) {
            throw err
        }

    }

    async listTeacher() {
        try {
            const result = await this.model.findAll()
            return result
        } catch (err) {
            throw err
        }
    }

    async getTeacherCount(){
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

    async searchTeacher(name, class_){
        try{
            const result = await this.model.findAll({ where : { name : {[Op.like] : `%${name}%`}, class : class_ }})
            return result
        }catch(err){
            throw err

        }
    }
}

module.exports = { TeacherService: new TeacherService(db.teacherModel.Teacher) }