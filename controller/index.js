const authController = require('./auth/auth.controller')
const dashboardController = require('./dashboard/admin.dashboard.controller')
const studentController = require('./student/student.controller')
const parentController = require('./parent/parent.controller')
const teacherController = require('./teacher/teacher.controller')
const expenseController = require('./expense/expense.controller')
module.exports = { authController, dashboardController, studentController, parentController, teacherController, expenseController }