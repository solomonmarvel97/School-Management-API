const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.post('/subjects',utils.validation.subjectValidation, utils.validation.check, middleware.Authorize.verifyToken, controller.teacherController.Teacher.addSubject)

router.get('/subjects/list-subject', middleware.Authorize.verifyToken, controller.teacherController.Teacher.listSubject)

router.get('/subjects/search', middleware.Authorize.verifyToken, controller.teacherController.Teacher.searchSubject)

module.exports = router