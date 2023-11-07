const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Student {

    // Add a Student 
    static async addStudent(req, res) {
        try {
            const { name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate,
                fatherName, motherName, email, phone, fatherOccupation, address, parentReligion } = req.body

            const image = req.files.studentImage ? req.files.studentImage[0] : null
            if (image === null) {
                return res.status(400).json(new ErrorResponse('image field required!'))
            }
            const uploadImage = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto'
            })
            const newStudent = await service.studentService.createStudent(name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate, uploadImage.secure_url)
            const newParent = await service.parentService.createParent(fatherName, motherName, email, phone, fatherOccupation, address, parentReligion)
            if (!newStudent && !newParent) {
                return res.status(400).json(new ErrorResponse('student and parent not added'))
            }
            return res.status(201).json(new SuccessResponse('student successfully added', newStudent))
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
}

module.exports = { Student }