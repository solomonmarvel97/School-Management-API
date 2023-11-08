const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/teachers', middleware.Authorize.verifyToken,upload.fields([{ name : 'teacherImage', maxCount : 1}]) ,controller.teacherController.Teacher.addTeacher)

router.get('/teachers/list-teacher',  middleware.Authorize.verifyToken, controller.teacherController.Teacher.listTeacher)

router.get('/teachers/search', middleware.Authorize.verifyToken, controller.teacherController.Teacher.searchTeacher)

router.get('/teachers/:id',  middleware.Authorize.verifyToken, controller.teacherController.Teacher.getTeacher)

module.exports = router