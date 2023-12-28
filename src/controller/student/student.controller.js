const { uploadToCloudinary } = require('../../config/cloudinary')
const { logger } = require('../../config/logger')
const { FeeService } = require('../../service/fee.service')
const { FeesGroupService } = require('../../service/feesgroup.service')
const { ParentService } = require('../../service/parent.service')
const { PromotionService } = require('../../service/promotion.service')
const { StudentService } = require('../../service/student.service')
const { respond } = require('../../utils/respond')


class StudentController {

    // Create a new Student 
    static async addStudent(req, res) {
        try {
            const { name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate,
                fatherName, motherName, email, phone, fathersOccupation, address, parentReligion } = req.body
            const image = req.files.studentImage ? req.files.studentImage[0] : null
            if (image === null) {
                return respond(res, 400, 'Image field required')
            }
            const uploadImage = await uploadToCloudinary(image.path, { resource_type: 'auto' })
            const newParent = await ParentService.createParent(fatherName, motherName, email, phone, fathersOccupation, address, parentReligion)
            const newStudent = await StudentService.createStudent(name, gender, Class, dateOfBirth, bloodGroup, studentReligion, addmissionDate, uploadImage.secure_url)
            if (!newParent && !newStudent) {
                return respond(res, 500, 'Failed to create Student and parent')
            }
            return respond(res, 201, 'Student created successfully', { student: newStudent, parent: newParent })
        } catch (err) {
            logger.error(`Failed to create student and parent ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve all Student
    static async listStudent(req, res) {
        try {
            const student = await StudentService.listStudent()
            if (!student || student.length===0) {
                return respond(res, 404, 'No students found')
            }
            return respond(res, 200, 'Student retrieved successfully', { student })
        } catch (err) {
            logger.error(`Failed to retrieve student ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Get a Particular Student
    static async getStudent(req, res) {
        try {
            const studentId = req.params.id
            const student = await StudentService.getStudent(studentId)
            if (!student) {
                return respond(res, 404, 'Student not found')
            }
            return respond(res, 200, 'Student retrieved successfully', { student })
        } catch (err) {
            logger.error(`Failed to retrieve student ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by name and filter by  class
    static async searchStudent(req, res) {
        try {
            const { name, Class } = req.query
            const student = await StudentService.searchStudent(name, Class)
            if (!student) {
                return respond(res, 404, 'Student not found')
            }
            return respond(res, 200, 'Student retrieved successfully', { student })
        } catch (err) {
            logger.error(`Failed to retrieve student ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //promote student
    static async promoteStudent(req, res) {
        try {
            const { name, currentClass, promotionFromClass, promotionToClass } = req.body
            const studentId = req.params.id
            const student = await PromotionService.promoteStudent(name, currentClass, promotionFromClass, promotionToClass)
            await StudentService.updateStudent(studentId, promotionToClass )
            if (!student) {
                return respond(res, 500, 'Failed to promote Student')
            }
            return respond(res, 200, 'Student promoted successfully', { student })
        } catch (err) {
            logger.error(`Failed to promote student ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve all student fees
    static async listStudentFee(req, res) {
        try {
            const student = await FeeService.listStudentFee()
            if (!student || student.length===0) {
                return respond(res, 404, 'No studentFee found')
            }
            return respond(res, 200, 'Fees retrieved successfully', { student })
        } catch (err) {
            logger.error(`Failed to retrieve student fees ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by name and filter by Class and status
    static async searchFee(req, res) {
        try {
            const { name, Class, status } = req.query
            const studentFee = await FeeService.searchFee(name, Class, status)
            if (!studentFee) {
                return respond(res, 404, 'Student Fee not found')
            }
            return respond(res, 200, 'Student Fee retrieved successfully ', { student_fee: studentFee })
        } catch (err) {
            logger.error(`Failed to retrieve student fees ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve all feeGroup
    static async listFeeGroup(req, res) {
        try {
            const feeGroup = await FeesGroupService.listFeesGroup()
            if (!feeGroup || feeGroup.length===0) {
                return respond(res, 404, 'No feeGroup found')
            }
            return respond(res, 200, 'FeeGroup retrieved successfully', { fee_group: feeGroup})
        } catch (err) {
            logger.error(`Failed to retrieve feeGroup ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search for a FeeGroup
    static async searchFeeGroup(req, res) {
        try {
            const { name } = req.query
            const feeGroup = await FeesGroupService.searchFeeGroup(name)
            if (!feeGroup) {
               return respond(res, 404, 'FeeGroup not found')
            }
            return respond(res, 200, 'FeeGroup retrieved successfully', { fee_group: feeGroup})
        } catch (err) {
            logger.error(`Failed to retrieve feeGroup ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }
}

module.exports = { StudentController }