const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')

class AdminDashboard {

    static async getData(req, res){
        try{
            const studentCount = await service.studentService.getStudentCount()
            const teachersCount = await service.teacherService.getTeacherCount()
            const parentCount = await service.parentService.getParentCount()
            if(!studentCount && !teachersCount && !parentCount){
                return res.status(400).json(new ErrorResponse('no data available'))
            }
            return res.status(200).json(new SuccessResponse('data successfully retrieved', { student : studentCount, teacher : teachersCount,
            parent : parentCount }))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving data'))

        }
    }
}

module.exports = { AdminDashboard }