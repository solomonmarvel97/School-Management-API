const express = require('express')
const router = express.Router()
const controller = require('../controller/index')
const utils = require('../utils/index')
const middleware = require('../middleware/authJwt')

router.get('/fees/list-fee', middleware.Authorize.verifyToken)

router.get('/fees/search', middleware.Authorize.verifyToken)

router.get('/fees/fee-group', middleware.Authorize.verifyToken)

module.exports = router