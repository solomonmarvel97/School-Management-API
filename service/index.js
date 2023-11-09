const adminService = require('./adminService')
const parentService = require('./parentService')
const profileService = require('./profileService')
const studentService = require('./studentService')
const teacherService = require('./teacherService')
const refreshTokenService = require('./refreshtokenService')
const promotionService = require('./promotionService')
const feesService = require('./feeService')
const feesgroupService = require('./feesgroupService')
const expenseService = require('./expenseService')
const subjectService = require('./subjectService')

module.exports = { adminService : adminService.AdminService, parentService : parentService.ParentService, profileService : profileService.ProfileService,
studentService : studentService.StudentService, teacherService : teacherService.TeacherService, refreshTokenService : refreshTokenService.RefreshTokenService,
promotionService : promotionService.PromotionService, feesService : feesService.FeeService, feesgroupService : feesgroupService.feesGropuService,
expenseService : expenseService.ExpenseService, subjectService : subjectService.SubjectService}