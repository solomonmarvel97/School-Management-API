const { Op } = require('sequelize')
const { db } = require('../model/index')

class TeacherService {
    constructor(model) {
        this.model = model
    }

    async createTeacher( fisrtname, lastname, gender, dateOfBirth , bloodGroup, religion, email , phone ,Class, subject, address,  startDate, imageUrl ) {
        try {
            const result = await this.model.create({  firstName: fisrtname, lastName : lastname,  gender : gender, dateOfBirth : dateOfBirth, bloodGroup : bloodGroup, religion : religion, email : email, phone : phone, Class : Class, subject : subject, address : address,  startDate : startDate, imageUrl : imageUrl })
            return result
        } catch (err) {
            throw err
        }

    }

    async listTeacher() {
        try {
            const result = await this.model.findAll({ attributes : ['id','firstName','lastName','gender','Class','subject','address', 'dateOfBirth', 'phone']})
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

    async getTeacher(studentId) {
        try {
            const result = await this.model.findOne({ where: { id: studentId }, attributes : ['imageUrl','id','firstName','lastName','gender','Class','subject','address', 'dateOfBirth','email', 'phone'] })
            return result
        } catch (err) {
            throw err
        }
    }

    async searchTeacher(firstName, Class){
        try{
            const result = await this.model.findAll({ where : {[Op.and] : [ firstName ? { firstName : {[Op.like]: `%${firstName}%`}} : null,
            Class ? { Class : Class } : null ]},  attributes : ['id','firstName','lastName','gender','Class','subject','address', 'dateOfBirth', 'phone']})
            return result
        }catch(err){
            throw err

        }
    }
}

module.exports = { TeacherService: new TeacherService(db.teacherModel.Teacher) }