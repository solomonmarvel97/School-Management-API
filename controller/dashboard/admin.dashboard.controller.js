const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')

class AdminDashboard {

    static async getData(req, res){
        try{
            const studentCount = await service.studentService.getStudentCount()
            if(!studentCount){
                return res.status(400).json(new ErrorResponse('data not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('data successfully retrieved', { student : studentCount}))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving data'))

        }
    }
}

module.exports = { AdminDashboard }