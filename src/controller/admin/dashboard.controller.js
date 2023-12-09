const { logger } = require("../../config/logger")
const { ParentService } = require("../../service/parent.service")
const { StudentService } = require("../../service/student.service")
const { TeacherService } = require("../../service/teacher.service")
const { respond } = require("../../utils/respond")


class AdminDashboard {

    static async DashboardData(req, res) {
        try {
            const studentCount = await StudentService.getStudentCount()
            const teachersCount = await TeacherService.getTeacherCount()
            const parentCount = await ParentService.getParentCount()
            if (!studentCount && !teachersCount && !parentCount) {
                return respond(res, 409, 'No data available')
            }
            return respond(res, 200, 'Data successfully retrieved', { studentCount, teachersCount, parentCount })
        } catch (err) {
            logger.error(`Error retrieving data ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }
}

module.exports = { AdminDashboard }