const express = require('express')
const router = express.Router()
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const { Authorize } = require('../utils/authJwt')
const { StudentController } = require('../controller/student/student.controller')
const { Validation } = require('../utils/validation')
const upload = multer({ storage })

router.post('/students', Authorize.verifyAccessToken, upload.fields([{ name : 'studentImage', maxCount : 1}]), StudentController.addStudent )

router.post('/students/promote/:id', Validation.promotionValidation, Validation.check,  Authorize.verifyAccessToken, StudentController.promoteStudent)

router.get('/students/list-student', Authorize.verifyAccessToken, StudentController.listStudent)

router.get('/students/search',  Authorize.verifyAccessToken, StudentController.searchStudent)

router.get('/students/:id', Authorize.verifyAccessToken, StudentController.getStudent)


module.exports = router