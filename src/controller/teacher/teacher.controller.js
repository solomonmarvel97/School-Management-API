const { uploadToCloudinary } = require("../../config/cloudinary")
const { logger } = require("../../config/logger")
const SubjectService = require("../../service/subject.service")
const { TeacherService } = require("../../service/teacher.service")
const { respond } = require("../../utils/respond")


class TeacherController {

    // Create a new teacher 
    static async addTeacher(req, res) {
        try {
            const { fisrtname, lastname, gender, dateOfBirth, bloodGroup, religion, email, phone, Class, subject, address, startDate } = req.body
            const image = req.files.teacherImage ? req.files.teacherImage[0] : null
            if (image === null) {
                return respond(res, 400, 'Image field required')
            }
            const uploadImage = await uploadToCloudinary(image.path, { resource_type: 'auto' })
            const newTeacher = await TeacherService.createTeacher(fisrtname, lastname, gender, dateOfBirth, bloodGroup, religion, email, phone, Class, subject, address, startDate, uploadImage.secure_url)
            if (!newTeacher) {
                return respond(res, 409, 'Teacher not created')
            }
            return respond(res, 201, 'Teacher successfully created', { teacher: newTeacher })
        } catch (err) {
            logger.error(`Failed to create a new teacher ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve  all teachers
    static async listTeacher(req, res) {
        try {
            const teacher = await TeacherService.listTeacher()
            if (!teacher) {
                return respond(res, 409, 'Teacher not retrieved')
            }
            return respond(res, 200, 'Teacher retrieved successfully', { teacher })
        } catch (err) {
            logger.error(`Failed to retrieve teachers ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Get a particular teacher
    static async getTeacher(req, res) {
        try {
            const teacherId = req.params.id
            const teacher = await TeacherService.getTeacher(teacherId)
            if (!teacher) {
                return respond(res, 404, 'Teacher not found')
            }
            return respond(res, 200, 'Teacher retrieved successfully', { teacher })
        } catch (err) {
            logger.error(`Failed to retrieve teacher ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by name and filter by Class
    static async searchTeacher(req, res) {
        try {
            const { name, Class } = req.query
            const teacher = await TeacherService.searchTeacher(name, Class)
            if (!teacher) {
                return respond(res, 404, 'Teacher not found')
            }
            return respond(res, 200, 'Teacher retrieved successfully', { teacher })
        } catch (err) {
            console.error(err)
            logger.error(`Failed to retrieve teacher ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Create a new subject
    static async addSubject(req, res) {
        try {
            const { name, teacher, Classes, days } = req.body
            const subject = await SubjectService.createSubject(name, teacher, Classes, days)
            if (!subject) {
                return respond(res, 409, 'Subject not created')
            }
            return respond(res, 200, 'Subject created successfully', { subject })
        } catch (err) {
            logger.error(`Failed to create a new subject ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Retrieve all Subject
    static async listSubject(req, res) {
        try {
            const subject = await SubjectService.listSubject()
            if (!subject) {
                return respond(res, 409, 'Subject not retrieved')
            }
            return respond(res, 409, 'Subject successfully retrieved', { subject })
        } catch (err) {
            logger.error(`Failed to retrieve subject ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by subject and filter by Classes
    static async searchSubject(req, res) {
        try {
            const { subject, Classes } = req.query
            const search = await SubjectService(subject, Classes)
            if (!search) {
                return respond(res, 404, 'Subject not found')
            }
            return respond(res, 200, 'Subject retrieved successfully', { search })
        } catch (err) {
            logger.error(`Failed to retrieve subject ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }
}

module.exports = { TeacherController }