const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/api/teachers', middleware.Authorize.verifyToken,upload.fields([{ name : 'teacherImage', maxCount : 1}]) ,controller.teacherController.Teacher.addTeacher)

router.get('/api/teachers/list-teacher',  middleware.Authorize.verifyToken, controller.teacherController.Teacher.listTeacher)

router.get('/api/teachers/search', middleware.Authorize.verifyToken, controller.teacherController.Teacher.searchTeacher)

router.get('/api/teachers/:id',  middleware.Authorize.verifyToken, controller.teacherController.Teacher.getTeacher)

module.exports = router