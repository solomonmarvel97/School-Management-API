const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Student {

    // Create a new Student 
    static async addStudent(req, res) {
        try {
            const { name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate,
                fatherName, motherName, email, phone, fathersOccupation, address, parentReligion } = req.body

            const image = req.files.studentImage ? req.files.studentImage[0] : null
            if (image === null) {
                return res.status(400).json(new ErrorResponse('image field required!'))
            }
            const uploadImage = await cloudinary.uploader.upload(image.path, { resource_type: 'auto' })
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

    //Retrieve all Student
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

    //Get a Particular Student
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

    //Search by name and filter by  class
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
    static async promoteStudent(req, res) {
        try {
            const { name, currentClass, promotionFromClass, promotionToClass } = req.body
            const student = await service.promotionService.promoteStudent(name, currentClass, promotionFromClass, promotionToClass)
            await service.studentService.updateStudent(name)
            if (!student) {
                return res.status(400).json(new ErrorResponse('student not promoted'))
            }
            return res.status(201).json(new SuccessResponse('student successfully promoted', student))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error promoting student'))

        }
    }

    //Retrieve all student fees
    static async listStudentFee(req, res) {
        try {
            const student = await service.feesService.listStudentFee()
            if (!student) {
                return res.status(400).json(new ErrorResponse('fees not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('fees successfully retrieved', student))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving fees'))
        }
    }

    //Search by name and filter by Class and status
    static async searchFee(req, res) {
        try {
            const { name, Class, status } = req.query
            const studentFee = await service.feesService.searchFee(name, Class, status)
            if (!studentFee) {
                return res.status(404).json(new ErrorResponse('student fee not found'))
            }
            return res.status(200).json(new SuccessResponse('student fee successfully retrieved', studentFee))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving fee'))
        }
    }

    //Retrieve all feeGroup
    static async listFeeGroup(req, res) {
        try {
            const feeGroup = await service.feesgroupService.listFeesGroup()
            if (!feeGroup) {
                return res.status(400).json(new ErrorResponse('feesGroup not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('feesGroup successfully retrieved', feeGroup))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving feeGroup'))
        }
    }

    //Search for a FeeGroup
    static async searchFeeGroup(req, res) {
        try {
            const { name } = req.query
            const feeGroup = await service.feesgroupService.searchFeeGroup(name)
            if (!feeGroup) {
                return res.status(404).json(new ErrorResponse('feeGroup not found'))
            }
            return res.status(200).json(new SuccessResponse('feesGroup successfully retrieved', feeGroup))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving fee'))
        }
    }
}

module.exports = { Student }