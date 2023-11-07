const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')

router.post('/login', utils.validation.loginValidation, utils.validation.check ,controller.authController.Auth.login)

router.post('/refreshtoken', utils.validation.refreshtokenValidation, utils.validation.check ,controller.authController.Auth.refreshVerifyToken)

module.exports = router