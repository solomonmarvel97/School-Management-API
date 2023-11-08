const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/students', middleware.Authorize.verifyToken, upload.fields([{ name : 'studentImage', maxCount : 1}]), controller.studentController.Student.addStudent)

router.post('/student/promote', utils.validation.promotionValidation, utils.validation.check, middleware.Authorize.verifyToken, controller.studentController.Student.promoteStudent)

router.get('/students/list-student', middleware.Authorize.verifyToken, controller.studentController.Student.listStudent)

router.get('/students/search', middleware.Authorize.verifyToken, controller.studentController.Student.searchStudent)

router.get('/students/:id', middleware.Authorize.verifyToken, controller.studentController.Student.getStudent)


module.exports = router