const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/api/students', middleware.Authorize.verifyToken, upload.fields([{ name : 'studentImage', maxCount : 1}]), controller.studentController.Student.addStudent)

router.post('/api/student/promote', utils.validation.promotionValidation, utils.validation.check, middleware.Authorize.verifyToken, controller.studentController.Student.promoteStudent)

router.get('/api/students/list-student', middleware.Authorize.verifyToken, controller.studentController.Student.listStudent)

router.get('/api/students/search', middleware.Authorize.verifyToken, controller.studentController.Student.searchStudent)

router.get('/api/students/:id', middleware.Authorize.verifyToken, controller.studentController.Student.getStudent)


module.exports = router