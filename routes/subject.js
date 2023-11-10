const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.post('/api/subjects',utils.validation.subjectValidation, utils.validation.check, middleware.Authorize.verifyToken, controller.teacherController.Teacher.addSubject)

router.get('/api/subjects/list-subject', middleware.Authorize.verifyToken, controller.teacherController.Teacher.listSubject)

router.get('/api/subjects/search', middleware.Authorize.verifyToken, controller.teacherController.Teacher.searchSubject)

module.exports = router