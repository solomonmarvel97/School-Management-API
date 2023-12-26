const express = require('express')
const router = express.Router()
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const { Authorize } = require('../utils/authJwt')
const { TeacherController } = require('../controller/teacher/teacher.controller')
const upload = multer({ storage })

router.post('/teachers', Authorize.verifyAccessToken , upload.fields([{ name : 'teacherImage', maxCount : 1}]), TeacherController.addTeacher)

router.get('/teachers/list-teacher', Authorize.verifyAccessToken, TeacherController.listTeacher)

router.get('/teachers/search', Authorize.verifyAccessToken, TeacherController.searchTeacher)

router.get('/teachers/:id',  Authorize.verifyAccessToken, TeacherController.getTeacher)

module.exports = router