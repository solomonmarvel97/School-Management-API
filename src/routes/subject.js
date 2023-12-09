const express = require('express')
const { Validation } = require('../utils/validation')
const { Authorize } = require('../utils/authJwt')
const { TeacherController } = require('../controller/teacher/teacher.controller')
const router = express.Router()

router.post('/subjects', Validation.subjectValidation, Validation.check, Authorize.verifyAccessToken, TeacherController.addSubject)

router.get('/subjects/list-subject', Authorize.verifyAccessToken, TeacherController.listSubject)

router.get('/subjects/search', Authorize.verifyAccessToken, TeacherController.searchSubject)

module.exports = router