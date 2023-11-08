const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Teacher {

    // Add a Teacher 
    static async addTeacher(req, res) {
        try {
            const { fisrtname, lastname, gender, dateOfBirth , bloodGroup, religion, email , phone ,Class, subject, address,  startDate } = req.body

            const image = req.files.teacherImage ? req.files.teacherImage[0] : null
            if (image === null) {
                return res.status(400).json(new ErrorResponse('image field required!'))
            }
            const uploadImage = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto'
            })
            const newTeacher = await service.teacherService.createTeacher( fisrtname, lastname, gender, dateOfBirth , bloodGroup, religion, email , phone , Class, subject, address,  startDate, uploadImage.secure_url)
            if (!newTeacher) {
                return res.status(400).json(new ErrorResponse('teacher not added'))
            }
            return res.status(201).json(new SuccessResponse('teacher successfully added', newTeacher))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error adding teacher'))
        }
    }

    //Return a List of Teachers
    static async listTeacher(req, res) {
        try {
            const teacher = await service.teacherService.listTeacher()
            if (!teacher) {
                return res.status(400).json(new ErrorResponse('teacher not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('teacher successfully retrieved', teacher))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving teacher'))

        }

    }

    //Get a Particular Teacher
    static async getTeacher(req, res) {
        try {
            const teacherId = req.params.id
            const teacher = await service.teacherService.getTeacher(teacherId)
            if (!teacher) {
                return res.status(404).json(new ErrorResponse('teacher not found'))
            }
            return res.status(200).json(new SuccessResponse('teacher successfully retrieved', teacher))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }

    //Search for a Teacher
    static async searchTeacher(req, res) {
        try {
            const { name, Class } = req.query
            const teacher = await service.teacherService.searchTeacher(name, Class)
            if (!teacher) {
                return res.status(404).json(new ErrorResponse('teacher not found'))
            }
            return res.status(200).json(new SuccessResponse('teacher successfully retrieved', teacher))

        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }
}

module.exports = { Teacher }