const adminService = require('./adminService')
const parentService = require('./parentService')
const profileService = require('./profileService')
const studentService = require('./studentService')
const teacherService = require('./teacherService')
const refreshTokenService = require('./refreshtokenService')
const promotionService = require('./promotionService')
const feesgroupService = require('./feesgroupService')
const feesService = require('./feeService')

module.exports = { adminService : adminService.AdminService, parentService : parentService.ParentService, profileService : profileService.ProfileService,
studentService : studentService.StudentService, teacherService : teacherService.TeacherService, refreshTokenService : refreshTokenService.RefreshTokenService,
promotionService : promotionService.PromotionService, feesgroupService : feesService.FeeService, feesgroupService : feesgroupService.feesGropuService}