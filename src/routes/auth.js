const express = require('express')
const router = express.Router()
const { Authorize } = require('../utils/authJwt')
const { AuthController } = require('../controller/auth/authController')
const { Validation } = require('../utils/validation')

router.post('/login', Validation.loginValidation, Validation.check , AuthController.login)

router.post('/refreshtoken', Authorize.verifyRefreshToken, AuthController.refreshVerifyToken)

module.exports = router