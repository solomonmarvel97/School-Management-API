const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Student {

    // Add a Student 
    static async addStudent(req, res) {
        try {
            const { name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate,
                fatherName, motherName, email, phone, fathersOccupation, address, parentReligion } = req.body

            const image = req.files.studentImage ? req.files.studentImage[0] : null
            if (image === null) {
                return res.status(400).json(new ErrorResponse('image field required!'))
            }
            const uploadImage = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto'
            })
            const newParent = await service.parentService.createParent(fatherName, motherName, email, phone, fathersOccupation, address, parentReligion)
            const newStudent = await service.studentService.createStudent(name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate, uploadImage.secure_url)
            if (!newStudent && !newParent) {
                return res.status(400).json(new ErrorResponse('student and parent not added'))
            }
            return res.status(201).json(new SuccessResponse('student successfully added', { student: newStudent, parent: newParent }))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error adding student'))
        }
    }

    //Return a List of Student
    static async listStudent(req, res) {
        try {
            const student = await service.studentService.listStudent()
            if (!student) {
                return res.status(400).json(new ErrorResponse('student not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('student successfully retrieved', student))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving student'))

        }

    }

    //Get a Particular Parent
    static async getStudent(req, res) {
        try {
            const studentId = req.params.id
            const student = await service.studentService.getStudent(studentId)
            if (!student) {
                return res.status(404).json(new ErrorResponse('student not found'))
            }
            return res.status(200).json(new SuccessResponse('student successfully retrieved', student))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }

    //Search for a Student
    static async searchStudent(req, res) {
        try {
            const { name, Class } = req.query
            const student = await service.studentService.searchStudent(name, Class)
            if (!student) {
                return res.status(404).json(new ErrorResponse('student not found'))
            }
            return res.status(200).json(new SuccessResponse('student successfully found', student))

        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }

    //promote student
    static async promoteStudent(req, res){
        try{
            const { name, currentClass, promotionFromClass, promotionToClass } = req.body
            const student = await service.promotionService.promoteStudent(name, currentClass, promotionFromClass, promotionToClass)
            await service.studentService.updateStudent(name)
            if(!student){
                return res.status(400).json(new ErrorResponse('student not promoted'))
            }
            return res.status(201).json(new SuccessResponse('student successfully promoted', student))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error promoting student'))

        }
    }
}

module.exports = { Student }