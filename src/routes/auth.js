const express = require('express')
const router = express.Router()
const utils = require('../utils/index')
const { Authorize } = require('../utils/authJwt')
const { Auth } = require('../controller/auth/authController')

router.post('/login', utils.validation.loginValidation, utils.validation.check , Auth.login)

router.post('/refreshtoken', Authorize.verifyRefreshToken, Auth.refreshVerifyToken)

module.exports = router