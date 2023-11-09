const authController = require('./auth/auth.controller')
const dashboardController = require('./admin/dashboard.controller')
const studentController = require('./student/student.controller')
const parentController = require('./parent/parent.controller')
const teacherController = require('./teacher/teacher.controller')
const expenseController = require('./expense/expense.controller')
const profileController = require('./admin/profile.controller')
module.exports = { authController, dashboardController, profileController, studentController, parentController, teacherController, expenseController }