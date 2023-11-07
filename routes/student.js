const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.post('/students', middleware.Authorize.verifyToken, upload.fields([{ name : 'studentImage', maxCount : 1}]), controller.studentController.Student.addStudent)

router.get('/students/list-student', middleware.Authorize.verifyToken, controller.studentController.Student.listStudent)

module.exports = router