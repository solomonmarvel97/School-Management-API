const express = require('express')
const { Authorize } = require('../utils/authJwt')
const { StudentController } = require('../controller/student/student.controller')
const router = express.Router()


router.get('/fees/list-fee', Authorize.verifyAccessToken , StudentController.listStudentFee)

router.get('/fees/search', Authorize.verifyAccessToken, StudentController.searchFee)

router.get('/fees/list-group', Authorize.verifyAccessToken, StudentController.listFeeGroup)

router.get('/fees/group-search', Authorize.verifyAccessToken, StudentController.searchFeeGroup)

module.exports = router