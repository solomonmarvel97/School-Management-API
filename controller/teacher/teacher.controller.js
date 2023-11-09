const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')
const cloudinary = require('cloudinary').v2

class Teacher {

    // Add a new teacher 
    static async addTeacher(req, res) {
        try {
            const { fisrtname, lastname, gender, dateOfBirth , bloodGroup, religion, email , phone ,Class, subject, address,  startDate } = req.body

            const image = req.files.teacherImage ? req.files.teacherImage[0] : null
            if (image === null) {
                return res.status(400).json(new ErrorResponse('image field required!'))
            }
            const uploadImage = await cloudinary.uploader.upload(image.path, {resource_type: 'auto'})
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

    //Return a list of teachers
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

    //Get a particular teacher
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

    //Search by name and filter by Class
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

    //Add a new subject
    static async addSubject(req, res){
        try{
            const { name, teacher, Classes, days } = req.body
            const subject = await service.subjectService.createSubject(name, teacher, Classes, days)
            if(!subject){
                return res.status(400).json(new ErrorResponse('subject not created'))
            }
            return res.status(200).json(new SuccessResponse('subject succesfully added', subject))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error adding subject'))
        }
    }

    //Return a List of Subject
    static async listSubject(req, res){
        try{
            const subject = await service.subjectService.listSubject()
            if(!subject){
                return res.status(400).json(new ErrorResponse('subject not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('subject successfully retrieved', subject))

        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving subject'))
        }
    }

    //Search by subject and filter by Classes
    static async searchSubject(req, res){
        try{
            const { subject, Classes } = req.query
            const search = await service.subjectService.searchSubject(subject, Classes)
            if(!search){
                return res.status(404).json(new ErrorResponse('subject not found'))
            }
            return res.status(200).json(new SuccessResponse('subject retrieved succesfully', search))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }
}

module.exports = { Teacher }