const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.get('/api/fees/list-fee', middleware.Authorize.verifyToken, controller.studentController.Student.listStudentFee)

router.get('/api/fees/search', middleware.Authorize.verifyToken, controller.studentController.Student.searchFee)

router.get('/api/fees/list-group', middleware.Authorize.verifyToken, controller.studentController.Student.listFeeGroup)

router.get('/api/fees/group-search', middleware.Authorize.verifyToken, controller.studentController.Student.searchFeeGroup)

module.exports = router